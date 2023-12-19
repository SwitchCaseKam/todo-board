import { Injectable, inject } from '@angular/core';
import { Project, TaskNode, tasksMapInitValue } from '../models/project.model';
import { STATUSES, Status, Task } from '../tasks-view/models/task.model';
import { TasksService } from './tasks.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface TasksViewData {
  sideBar: TaskNode[]
  operationMenu: Map<Status, Task[]>
  tasksView: Task[]
}

@Injectable({
  providedIn: 'root'
})
export class TasksViewService {

  private selectedProjectName: string =''
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
      console.log('[tasks-view-service] tasks view service DATA', projectsData);
      this.fillSideBarInfo(projectsData);
      this.projects = projectsData;
      if (this.selectedProjectName !== '') {
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

  private fillSideBarInfo(projectsData: Project[]) {
    const projects: TaskNode[][] = [];
    console.log('KAMIL', projectsData);
    projectsData.forEach(project => projects.push(project.tasksTree.flat()));
    this.tasksViewData.sideBar[0].children = projects.flat();
  }

  public filterUserData(userName: string): void {
    this.tasksViewData.tasksView = this.projects.filter(project => project.name === this.selectedProjectName)[0].tasks;
    if (userName !== '') {
      this.tasksViewData.tasksView = this.tasksViewData.tasksView.filter(task => task.assignee === userName);
      
      const projectNamesWithTasksForUser: Project[] = [];
      this.projects.forEach(project => {
        if (project.tasks.some(t => t.assignee === userName)) {
          projectNamesWithTasksForUser.push(project);
        }
      });

      console.log(userName, ' is assignee in these projects: ', projectNamesWithTasksForUser);

      const filteredProject = new Project(this.selectedProjectName, this.tasksViewData.tasksView);
      console.log('filteredProject:', filteredProject)
      
      const projects: TaskNode[][] = [];
      // projectNamesWithTasksForUser.forEach(project => {
          console.log('xc')
          // let tasksNode = project.tasksTree.filter(taskGroup => { 
          //   if (taskGroup.children) {
          //     taskGroup.children.forEach(t => {
                
          //     }) 
          //     console.log(t)
          //     return t.assignee === userName 
          //   }
            
          // })
      //     project.tasksTree.forEach(taskGroup => {
      //       console.log('taskGroup', taskGroup)
      //       if (taskGroup.children) {
      //         taskGroup.children.forEach(t => {
      //           if (t.children) {
      //             t.children.forEach(tt => {
      //               if (tt.assignee === userName) {
      //                 projects.push([tt]);
      //               }
      //             })
      //           }
                
      //         })
      //       }
      //     });
      //     console.log('XDD', projects)
      //     projects.flat()
      // });
      // this.tasksViewData.sideBar[0].children = projects.flat();

    }
    this.tasksViewData$.next(this.tasksViewData);
    
    // const tasksMap = new Map<Status, Task[]>([
    //   [Status.TODO, []],
    //   [Status.IN_PROGRESS, []],
    //   [Status.DONE, []],
    //   [Status.BLOCKED, []],
    //   [Status.NOT_VALID, []]
    // ]);
    // this.tasksViewData.tasksView.forEach((task: Task) => {
    //   const tasks = tasksMap.get(task.status)!;
    //   tasks.push(task);
    //   tasksMap.set(task.status, tasks);
    // });


  //   const tasksTree = [{
  //     name: this.name, 
  //     children: [
  //       { name: Status.TODO.toString(), children: [] },
  //       { name: Status.IN_PROGRESS.toString(), children: [] },
  //       { name: Status.DONE.toString(), children: [] },
  //       { name: Status.BLOCKED.toString(), children: []},
  //       { name: Status.NOT_VALID.toString(), children: [] }
  //     ]
  //   }];
  //   STATUSES.forEach((status, i) => {
  //       if (tasksTree[0].children && tasksTree[0].children[i]) {
  //           const tasks: Task[] = tasksMap.get(status)!;
  //           tasksTree[0].children[i].children = tasks.map(t => {
  //             return {name: `[${t.id}] ${t.name}`, assignee: t.assignee} as TaskNode
  //           });
  //       }
  // });

    // this.tasksViewData.sideBar[0].children?.forEach(
    //   project => project.children?.forEach(
    //     tasksGroup => {
    //       tasksGroup.children?.forEach(
    //         t => {
    //           if (t.assignee === userName) {
    //             console.log(t.name);
    //           }
    //         }
    //       )
    //     }
    //   )
    // );

    
  }
}
