import { Injectable } from '@angular/core';
import { Status, Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class DragItemService {

  private task: Task = {
    id: 0,
    name: '',
    description: '',
    status: Status.TODO,
    assignee: 'assignee',
    estimation: 1
  };

  constructor() { }

  public setDraggedTask(task: Task): void {
    this.task = task;
  }

  public getDraggedTask(): Task {
    return this.task;
  }

}
