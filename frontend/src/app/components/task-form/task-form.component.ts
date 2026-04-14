import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>{{ isEdit ? 'Edit Task' : 'New Task' }}</h1>

    <div *ngIf="error" style="color:red; margin-bottom:1rem;">{{ error }}</div>

    <form (ngSubmit)="submit()">
      <label>Title *</label>
      <input [(ngModel)]="task.title" name="title" required placeholder="Task title" />

      <label>Description</label>
      <textarea [(ngModel)]="task.description" name="description" rows="3" placeholder="Optional description"></textarea>

      <label>Status</label>
      <select [(ngModel)]="task.status" name="status">
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <label>Deadline</label>
      <input [(ngModel)]="task.deadline" name="deadline" type="date" />

      <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
        <button type="submit" class="btn-success">{{ isEdit ? 'Update' : 'Create' }}</button>
        <button type="button" class="btn-secondary" (click)="cancel()">Cancel</button>
      </div>
    </form>
  `
})
export class TaskFormComponent implements OnInit {
  task: Task = { title: '', description: '', status: 'TODO' };
  isEdit = false;
  error = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.taskService.getById(id).subscribe({
        next: data => this.task = data,
        error: () => this.error = 'Failed to load task.'
      });
    }
  }

  submit(): void {
    if (!this.task.title.trim()) { this.error = 'Title is required.'; return; }

    if (this.isEdit && this.task.id) {
      this.taskService.update(this.task.id, this.task).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: () => this.error = 'Update failed.'
      });
    } else {
      this.taskService.create(this.task).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: () => this.error = 'Create failed.'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}
