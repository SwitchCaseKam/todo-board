import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OperationMenuComponent } from './operation-menu/operation-menu.component';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { TasksService } from './services/tasks.service';
import { Subscription } from 'rxjs';
import { Project, TaskNode } from './models/project.model';
import { Status, Task } from './tasks-view/models/task.model';


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

  private tasksService: TasksService = inject(TasksService);
  private projectsDataSubscription: Subscription = new Subscription();

  protected selectedProject = '';
  protected sideBarData: TaskNode[] = [];
  protected operationMenuData!: Map<Status, Task[]>;
  protected tasksViewData!: Map<Status, Task[]>; 

  public ngOnInit(): void {
    this.projectsDataSubscription = this.tasksService.getProjects().subscribe(
      (projectsData: Project[]) => {
        console.log('[tasks-board-component]', projectsData);
        // const projects = [];
        // projectsData.forEach(project => {
        //   project.tasksTree
        // });
        // this.sideBarData = projectsData.
      }
    );
  }

  public ngOnDestroy(): void {
    this.projectsDataSubscription.unsubscribe();
  }

}
