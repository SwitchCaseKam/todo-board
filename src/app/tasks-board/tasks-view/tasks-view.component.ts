import { Component, Input, OnChanges, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STATUSES, Status, Task } from './models/task.model';
import { TasksService } from '../services/tasks.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SingleTaskComponent } from './single-task/single-task.component';
import { DragItemService } from './services/drag-item.service';
import { GroupHeaderComponent } from './group-header/group-header.component';
import { TaskSelectService } from '../services/task-select.service';
import { TasksViewService } from '../services/tasks-view.service';

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

  public ngOnInit(): void {
    console.log('[tasks-view-component] tasks onINIT' , this.tasks)
    this.tasksViewService.getSelectedProjectName$().subscribe(
      projectName => this.selectedProjectName = projectName
    );
  }

  public ngOnDestroy(): void {}

  protected getTasks(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  protected drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const containerId = Number(event.container.id.split('-').slice(-1));
      const currentStatus = STATUSES[containerId];
      this.tasks = this.tasks.filter(task => task.status !== currentStatus);
      this.tasks = this.tasks.concat(event.container.data);
      this.tasksService.updateProjectData(this.selectedProjectName, this.tasks)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const selectedTask = this.dragItemService.getDraggedTask();
      const containerId = Number(event.container.id.split('-').slice(-1));
      selectedTask.status = STATUSES[containerId];
      this.tasksService.updateProjectData(this.selectedProjectName, this.tasks)
    }
  }
}
