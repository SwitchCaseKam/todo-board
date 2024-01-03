import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OperationMenuComponent } from './operation-menu/operation-menu.component';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { Subscription } from 'rxjs';
import { TaskNode, tasksMapInitValue } from './models/project.model';
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

  private subs: Set<Subscription> = new Set();
  protected selectedProjectName = '';
  protected sideBarData: TaskNode[] = [];
  protected operationMenu: Map<Status, Task[]> = tasksMapInitValue;
  protected tasksView: Task[] = [];
  private tasksViewService: TasksViewService = inject(TasksViewService);

  public ngOnInit(): void {
    this.subs.add(this.tasksViewService.getTasksViewData$().subscribe(tasksViewData2 => {
      const tasksViewData = cloneDeep(tasksViewData2);
      this.sideBarData = tasksViewData.sideBar;
      this.operationMenu = tasksViewData.operationMenu;
      this.tasksView = tasksViewData.tasksView;
    }));
    this.subs.add(this.tasksViewService.getSelectedProjectName$().subscribe(
      projectName => this.selectedProjectName = projectName
    ));
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public handleFilter(userName: string): void {
    this.tasksViewService.filterUserData(userName);
  }

}
