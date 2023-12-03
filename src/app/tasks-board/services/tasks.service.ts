import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Status, Task } from '../tasks-view/models/task.model';
import { Project, TaskNode } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [
    {
      id: 1,
      name: 'Task 1',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.TODO,
      assignee: 'john',
      creationDate: new Date().toLocaleDateString(),
      estimation: 10
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.IN_PROGRESS,
      assignee: 'alice',
      creationDate: new Date().toLocaleDateString(),
      estimation: 25
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.TODO,
      assignee: 'bob',
      creationDate: new Date().toLocaleDateString(),
      estimation: 56
    },
    {
      id: 4,
      name: 'Task 4',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.DONE,
      assignee: 'john',
      creationDate: new Date().toLocaleDateString(),
      estimation: 10
    },
    {
      id: 5,
      name: 'Task 5',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.IN_PROGRESS,
      assignee: 'alice',
      creationDate: new Date().toLocaleDateString(),
      estimation: 25
    },
    {
      id: 6,
      name: 'Task 6',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.TODO,
      assignee: 'bob',
      creationDate: new Date().toLocaleDateString(),
      estimation: 5
    },
    {
      id: 7,
      name: 'Task 7',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.NOT_VALID,
      assignee: 'bob',
      creationDate: new Date().toLocaleDateString(),
      estimation: 56
    },
    {
      id: 8,
      name: 'Task 8',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.DONE,
      assignee: 'bob',
      creationDate: new Date().toLocaleDateString(),
      estimation: 56
    }
  ];

  private projects: Project[] = [];
  private projects$: BehaviorSubject<Project[]> = new BehaviorSubject(this.projects);

  protected project: TaskNode[] = [{
    name: 'FirstProject', 
    children: [
      {
        name: Status.TODO.toString(),
        children: []
      },
      {
        name: Status.IN_PROGRESS.toString(),
        children: []
      },
      {
        name: Status.DONE.toString(),
        children: []
      },
      {
        name: Status.BLOCKED.toString(),
        children: []
      },
      {
        name: Status.NOT_VALID.toString(),
        children: []
      }
    ]
  }];

  protected projectNull = this.project;
  protected project$: BehaviorSubject<TaskNode[]> = new BehaviorSubject<TaskNode[]>(this.project);

  protected tasksMap: Map<Status, Task[]> = new Map<Status, Task[]>([
    [Status.TODO, []],
    [Status.IN_PROGRESS, []],
    [Status.DONE, []],
    [Status.BLOCKED, []],
    [Status.NOT_VALID, []]
  ]);
  protected tasksMap$: BehaviorSubject<Map<Status, Task[]>> = new BehaviorSubject<Map<Status, Task[]>>(this.tasksMap);

  constructor() {
    this.projects.push(
      new Project('Pierwszy', this.tasks),
      new Project('Drugi', this.tasks),
      new Project('Trzeci', this.tasks),
    );

    console.log('PROJECT:', this.projects);

    this.createTasksMap();
    this.createProjectTree();
  }

  public getProjectTree$(): Observable<TaskNode[]> {
    return this.project$.asObservable();
  }

  public getTasksMap(): Observable<Map<Status, Task[]>> {
    return this.tasksMap$.asObservable();
  }

  public getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  public updateTaskMap(taskMap: Map<Status, Task[]>): void {
    this.tasksMap = taskMap;
    this.tasksMap$.next(this.tasksMap);
    this.createProjectTree();
  }

  public createTask(name: string, description: string, assignee: string, estimation: number): void {
    let currentId = 0;
    this.tasks.forEach(t => { t.id > currentId; currentId = t.id});
    currentId++;
    const newTask : Task = {
      id: currentId,
      name: name,
      description,
      status: Status.TODO,
      assignee: assignee,
      creationDate: new Date().toLocaleDateString(),
      estimation: estimation
    };
    this.tasks.push(newTask);
    const todoTasks = this.tasksMap.get(Status.TODO);
    todoTasks?.push(newTask);
    this.tasksMap.set(Status.TODO, todoTasks!);
    this.createProjectTree();
  }

  public updateTask(id: number, name: string, description: string, status: Status, assignee: string, estimation: number) {
    const newTask : Task = {
      id,
      name,
      description,
      status,
      assignee,
      creationDate: new Date().toLocaleDateString(),
      estimation
    };
    const tasks = this.tasks.filter(task => task.id !== id);
    tasks.push(newTask);
    this.tasks = tasks;
    this.createTasksMap();
    this.createProjectTree();
  }

  public removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.createTasksMap();
    this.createProjectTree();
  }

  private createProjectTree(): void {
    this.project = this.projectNull;

    const statuses: Status[] = [
      Status.TODO,
      Status.IN_PROGRESS,
      Status.DONE,
      Status.BLOCKED,
      Status.NOT_VALID
    ];

    statuses.forEach((status, i) => {
        if (this.project[0].children && this.project[0].children[i]) {
            const tasks: Task[] = this.tasksMap.get(status)!;
            this.project[0].children[i].children = tasks.map(t => {
              return {name: `[${t.id}] ${t.name}`} as TaskNode
            });
        }
    });
      this.project$.next(this.project);
  }

  private createTasksMap(): void {
    this.tasksMap = new Map<Status, Task[]>([
      [Status.TODO, []],
      [Status.IN_PROGRESS, []],
      [Status.DONE, []],
      [Status.BLOCKED, []],
      [Status.NOT_VALID, []]
    ]);
    this.tasks.forEach((task: Task) => {
      const tasks = this.tasksMap.get(task.status)!;
      tasks.push(task);
      this.tasksMap.set(task.status, tasks);
    });
    this.tasksMap$.next(this.tasksMap);
  }
}
