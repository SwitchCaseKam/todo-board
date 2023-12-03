import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status, Task } from './models/task.model';
import { TasksService } from '../services/tasks.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SingleTaskComponent } from './single-task/single-task.component';
import { DragItemService } from './services/drag-item.service';
import { Subscription } from 'rxjs';
import { GroupHeaderComponent } from './group-header/group-header.component';
import { TaskSelectService } from '../services/task-select.service';

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

  protected tasksCategories: Status[] = [
    Status.TODO, Status.IN_PROGRESS, Status.DONE, Status.BLOCKED, Status.NOT_VALID
  ];
  protected tasksMap!: Map<Status, Task[]>;
  protected tasksSubscription = new Subscription();
  protected tasksService = inject(TasksService);
  protected dragItemService = inject(DragItemService);
  protected taskSelectService = inject(TaskSelectService);

  public ngOnInit(): void {
    this.tasksSubscription = this.tasksService.getTasksMap().subscribe((tasksMap: Map<Status, Task[]>) => {
      this.tasksMap = tasksMap;
    });
  }

  public ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }

  protected getTasksMap(status: string): Task[] {
    return this.tasksMap.get(status as Status)!;
  }

  protected drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const selectedTask = this.dragItemService.getDraggedTask();
      const containerId = Number(event.container.id.split('-').slice(-1));
      this.tasksMap.get(selectedTask.status)?.filter(task => task.id != selectedTask.id)
      selectedTask.status = this.tasksCategories[containerId];
      this.tasksMap.set(selectedTask.status, event.container.data); 
      this.tasksService.updateTaskMap(this.tasksMap);
    }
  }

  protected handleTasksUpdate(event: Event): void {
    // this.tasksMap.set(tasks[0].status, tasks);
    console.log(event)
  }

  public taskViewClick(): void {
    // this.taskSelectService.resetSelectedTask();
  }
}
