import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { Status, Task } from './models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks-view',
  standalone: true,
  imports: [
    CommonModule,
    CategoryComponent
  ],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.css'
})
export class TasksViewComponent implements OnInit{

  protected tasks: Task[] = [];
  protected tasksCategories: Status[] = [
    Status.TODO, Status.IN_PROGRESS, Status.DONE, Status.BLOCKED, Status.NOT_VALID
  ];
  protected tasksService = inject(TasksService);

  public ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  protected getTasks(status: Status): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
}
