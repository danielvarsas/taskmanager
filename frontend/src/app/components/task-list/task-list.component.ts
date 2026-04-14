import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>Tasks</h1>

    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error" style="color:red;">{{ error }}</div>

    <table *ngIf="!loading && tasks.length > 0">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Deadline</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let task of tasks">
          <td>{{ task.title }}</td>
          <td><span [class]="'status-' + task.status">{{ task.status }}</span></td>
          <td>{{ task.deadline ? (task.deadline | date:'yyyy-MM-dd') : '-' }}</td>
          <td>
            <button class="btn-secondary" [routerLink]="['/tasks', task.id]">View</button>
            <button class="btn-primary"   [routerLink]="['/tasks', task.id, 'edit']">Edit</button>
            <button class="btn-danger"    (click)="delete(task.id!)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p *ngIf="!loading && tasks.length === 0">No tasks yet. <a routerLink="/tasks/new">Create one!</a></p>
  `
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.taskService.getAll().subscribe({
      next: data => { this.tasks = data; this.loading = false; },
      error: () => { this.error = 'Failed to load tasks.'; this.loading = false; }
    });
  }

  delete(id: string): void {
    if (!confirm('Delete this task?')) return;
    this.taskService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('Delete failed.')
    });
  }
}
