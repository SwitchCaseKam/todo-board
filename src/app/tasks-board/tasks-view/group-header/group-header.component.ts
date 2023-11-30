import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkMenuItemRadio, CdkMenuItemCheckbox, CdkMenuGroup,
  CdkMenu, CdkMenuTrigger, CdkMenuItem, CdkMenuBar,
} from '@angular/cdk/menu';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-group-header',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuBar,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemCheckbox,
    CdkMenuItemRadio
  ],
  templateUrl: './group-header.component.html',
  styleUrl: './group-header.component.css'
})
export class GroupHeaderComponent {
  @Input() name: string = '';
  @Input() tasks: Task[] = [];
  @Output() tasksUpdate = new EventEmitter<Task[]>();

  public handledTasksAssignedToMe(): void {
    this.tasks =  this.tasks.filter(task => task.assignee === 'bob');
    console.log(this.tasks)
    this.tasksUpdate.emit(this.tasks);
  }

  public handledFilterByAssignee(): void {

  }

  public sortByPriority(): void {
  }

  public sortByEffort(asc: boolean = true): void {
    if (asc) {
      this.tasks.sort((a, b) => a.estimation - b.estimation);
    } else {
      this.tasks.sort((a, b) => (a.estimation > b.estimation ? -1 : 1));
    }
    this.tasksUpdate.emit(this.tasks);
  }
}
