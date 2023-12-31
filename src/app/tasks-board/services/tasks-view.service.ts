import { Injectable, inject } from '@angular/core';
import { Project, TaskNode, tasksMapInitValue } from '../models/project.model';
import { Status, Task } from '../tasks-view/models/task.model';
import { TasksService } from './tasks.service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TasksViewData {
  sideBar: TaskNode[]
  operationMenu: Map<Status, Task[]>
  tasksView: Task[]
}

@Injectable({
  providedIn: 'root'
})
export class TasksViewService {

  private selectedProjectName: string = '';
  private selectedProjectName$ = new BehaviorSubject<string>(this.selectedProjectName);

  private projects: Project[] = [];

  private tasksViewData: TasksViewData = {
    sideBar: [{
      name: 'Projects',
      children: []
    }],
    operationMenu: tasksMapInitValue,
    tasksView: []
  }
  private tasksViewData$ = new BehaviorSubject<TasksViewData>(this.tasksViewData);
  private tasksService: TasksService = inject(TasksService)

  constructor() { 
    this.tasksService.getProjects().subscribe(projectsData => {
      this.fillSideBarInfo(projectsData);
      this.projects = projectsData;
      if (this.selectedProjectName !== '') {
        this.fillSideBarInfo(projectsData);
        this.tasksViewData.operationMenu = projectsData.filter(project => project.name === this.selectedProjectName)[0].tasksMap;
        this.tasksViewData.tasksView = projectsData.filter(project => project.name === this.selectedProjectName)[0].tasks;  
      } 
      this.tasksViewData$.next(this.tasksViewData);
    })
  } 
  
  public getTasksViewData$(): Observable<TasksViewData> {
    return this.tasksViewData$;
  }

  public getSelectedProjectName$(): Observable<string> {
    return this.selectedProjectName$;
  }

  public setSelectedProjectName(projectName: string): void {
    if (projectName === this.selectedProjectName) return;
    this.selectedProjectName = projectName;
    this.tasksViewData.operationMenu = this.projects.filter(project => project.name === this.selectedProjectName)[0].tasksMap;
    this.tasksViewData.tasksView  = this.projects.filter(project => project.name === this.selectedProjectName)[0].tasks;
    this.selectedProjectName$.next(this.selectedProjectName);  
    this.tasksViewData$.next(this.tasksViewData);
  }  
  
  public filterUserData(userName: string): void {
    this.tasksViewData.tasksView = this.projects.filter(project => project.name === this.selectedProjectName)[0].tasks;
    this.fillSideBarInfo(this.projects);
    if (userName !== '') {
      this.tasksViewData.tasksView = this.tasksViewData.tasksView.filter(task => task.assignee === userName);
      const projectNamesWithTasksForUser: Project[] = [];
      this.projects.forEach(project => {
        if (project.tasks.some(t => t.assignee === userName)) {
          projectNamesWithTasksForUser.push(project);
        }
      });
      const filteredProject = new Project(this.selectedProjectName, this.tasksViewData.tasksView);
      this.fillSideBarInfo([filteredProject])
    }
    this.tasksViewData$.next(this.tasksViewData);
  }

  private fillSideBarInfo(projectsData: Project[]) {
    const projects: TaskNode[][] = [];
    projectsData.forEach(project => projects.push(project.tasksTree.flat()));
    this.tasksViewData.sideBar[0].children = projects.flat();
  }


}
