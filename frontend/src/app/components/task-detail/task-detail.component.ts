import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>Task Details</h1>

    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error" style="color:red;">{{ error }}</div>

    <div class="card" *ngIf="task">
      <p><strong>Title:</strong> {{ task.title }}</p>
      <p><strong>Description:</strong> {{ task.description || '-' }}</p>
      <p>
        <strong>Status:</strong>
        <span [class]="'status-' + task.status"> {{ task.status }}</span>
      </p>
      <p><strong>Deadline:</strong> {{ task.deadline ? (task.deadline | date:'yyyy-MM-dd') : '-' }}</p>

      <div style="margin-top:1rem; display:flex; gap:0.5rem;">
        <button class="btn-primary"    [routerLink]="['/tasks', task.id, 'edit']">Edit</button>
        <button class="btn-danger"     (click)="delete()">Delete</button>
        <button class="btn-secondary"  routerLink="/tasks">Back</button>
      </div>
    </div>
  `
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  loading = true;
  error = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.taskService.getById(id).subscribe({
      next: data => { this.task = data; this.loading = false; },
      error: () => { this.error = 'Task not found.'; this.loading = false; }
    });
  }

  delete(): void {
    if (!this.task?.id || !confirm('Delete this task?')) return;
    this.taskService.delete(this.task.id).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => alert('Delete failed.')
    });
  }
}
