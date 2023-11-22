import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status, Task } from '../models/task.model';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-single-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.css'
})
export class SingleTaskComponent {
  @Input() data: Task = {
    id: 0,
    title: '',
    description: '',
    status: Status.TODO,
    assignee: '',
    creationDate: new Date().toLocaleDateString(),
    estimation: 0
  };
  protected tasksService = inject(TasksService);
  
  public edit() {
    this.data.status = Status.BLOCKED;
    this.tasksService.updateSingleTask(this.data);
  }
}
