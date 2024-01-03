import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Status, Task } from '../tasks-view/models/task.model';
import { Project } from '../models/project.model';
import { tasks1, tasks2 } from './tasks.example-data';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks1: Task[] = tasks1;
  private tasks2: Task[] = tasks2;

  private projects: Project[] = [];
  private projects$: BehaviorSubject<Project[]> = new BehaviorSubject(this.projects);

  constructor() {
    this.projects.push(
      new Project('Pierwszy', this.tasks1),
      new Project('Drugi', this.tasks2)
    );
  }

  public getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  public createNewProject(projectName: string) {
    this.projects.push(new Project(projectName, []));
    this.projects$.next(this.projects);
  }

  public createTask(projectName: string, taskName: string, taskDescription: string, taskAssignee: string, taskEstimation: number): void {
    const currentProject = this.projects.find(p => p.name === projectName);
    if (currentProject) {
      let currentId = 0;
      if (currentProject.tasks.length > 0) {
        currentProject.tasks.sort((a, b) => a.id - b.id).slice(-1)[0].id;
        currentProject.tasks.forEach(t => { t.id > currentId; currentId = t.id});
        currentId++;
      }
      const newTask : Task = {
        id: currentId,
        name: taskName,
        description: taskDescription,
        status: Status.TODO,
        assignee: taskAssignee,
        creationDate: new Date().toLocaleDateString(),
        estimation: taskEstimation
      };
      currentProject.tasks.push(newTask);
      this.updateProjectData(projectName, currentProject.tasks);
    }
  }

  public updateTask(projectName: string, taskId: number, taskName: string, taskDescription: string, taskStatus: Status, taskAssignee: string, taskEstimation: number): void {
    const newTask : Task = {
      id: taskId,
      name: taskName,
      description: taskDescription,
      status: taskStatus,
      assignee: taskAssignee,
      creationDate: new Date().toLocaleDateString(),
      estimation: taskEstimation
    };
    const currentProject = this.projects.find(p => p.name === projectName);
    if (currentProject) {
      const taskIndex = currentProject.tasks.findIndex(task => task.id === taskId)!;
      currentProject.tasks[taskIndex] = newTask;
      this.updateProjectData(projectName, currentProject.tasks);
    }
  }

  public deleteTask(projectName: string, taksId: number): void {
    const currentProject = this.projects.find(p => p.name === projectName);
    if (currentProject) {
      currentProject.tasks = currentProject.tasks.filter(task => task.id !== taksId);
      this.updateProjectData(projectName, currentProject.tasks);
    }
  }

  public updateProjectData(projectName: string, tasks: Task[]): void {
    const currentProject = this.projects.find(p => p.name === projectName);
    const currentProjectIndex = this.projects.findIndex(p => p.name === projectName);
    if (currentProject) { 
      currentProject.updateData(tasks);
      this.projects[currentProjectIndex] = currentProject;
      this.projects$.next(this.projects);
    };
  }
}
