import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <strong style="color:white; font-size:1.2rem;">📋 Task Manager</strong>
      <a routerLink="/tasks">All Tasks</a>
      <a routerLink="/tasks/new">+ New Task</a>
    </nav>
    <div class="container">
      <router-outlet />
    </div>
  `
})
export class AppComponent {}
