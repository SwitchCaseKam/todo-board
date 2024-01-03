import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STATUSES, Task } from './models/task.model';
import { TasksService } from '../services/tasks.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SingleTaskComponent } from './single-task/single-task.component';
import { DragItemService } from './services/drag-item.service';
import { GroupHeaderComponent } from './group-header/group-header.component';
import { TaskSelectService } from '../services/task-select.service';
import { TasksViewService } from '../services/tasks-view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks-view',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    SingleTaskComponent,
    GroupHeaderComponent
  ],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.css'
})
export class TasksViewComponent implements OnInit, OnDestroy {

  @Input() tasks!: Task[];
  protected tasksService = inject(TasksService);
  protected tasksViewService = inject(TasksViewService);
  protected dragItemService = inject(DragItemService);
  protected taskSelectService = inject(TaskSelectService);
  protected selectedProjectName: string = '';
  private projectNameSubscription = new Subscription();

  public ngOnInit(): void {
    this.projectNameSubscription = this.tasksViewService.getSelectedProjectName$().subscribe(
      projectName => this.selectedProjectName = projectName
    );
  }

  public ngOnDestroy(): void {
    this.projectNameSubscription.unsubscribe();
  }

  protected getTasks(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  protected drop(event: CdkDragDrop<Task[]>) {
    const containerId = Number(event.container.id.split('-').slice(-1));
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const currentStatus = STATUSES[containerId];
      this.tasks = this.tasks.filter(task => task.status !== currentStatus);
      this.tasks = this.tasks.concat(event.container.data);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const selectedTask = this.dragItemService.getDraggedTask();
      selectedTask.status = STATUSES[containerId];
    }
    this.tasksService.updateProjectData(this.selectedProjectName, this.tasks)
  }
}
