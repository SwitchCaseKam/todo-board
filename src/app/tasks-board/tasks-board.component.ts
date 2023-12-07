import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OperationMenuComponent } from './operation-menu/operation-menu.component';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { TasksService } from './services/tasks.service';
import { Subscription } from 'rxjs';
import { Project, TaskNode, tasksMapInitValue } from './models/project.model';
import { Status, Task } from './tasks-view/models/task.model';
import { TasksViewService } from './services/tasks-view.service';
import { cloneDeep } from 'lodash';


@Component({
  selector: 'app-tasks-board',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    OperationMenuComponent,
    TasksViewComponent,
    
  ],
  templateUrl: './tasks-board.component.html',
  styleUrl: './tasks-board.component.css'
})
export class TasksBoardComponent implements OnInit, OnDestroy{

  private tasksViewService: TasksViewService = inject(TasksViewService);
  private projectsDataSubscription: Subscription = new Subscription();

  protected selectedProjectName = '';

  protected sideBarData: TaskNode[] = [];
  protected operationMenu: Map<Status, Task[]> = tasksMapInitValue;
  protected tasksView: Task[] = [];

  public ngOnInit(): void {
    this.tasksViewService.getTasksViewData$().subscribe(tasksViewData2 => {
      const tasksViewData = cloneDeep(tasksViewData2);
      this.sideBarData = tasksViewData.sideBar;
      this.operationMenu = tasksViewData.operationMenu;
      this.tasksView = tasksViewData.tasksView;
    });

    this.tasksViewService.getSelectedProjectName$().subscribe(
      projectName => {
        console.log('[tasks-board-component] selected project', projectName)
        this.selectedProjectName = projectName;
      }
    );
  }

  public ngOnDestroy(): void {
    this.projectsDataSubscription.unsubscribe();
  }

}
