import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Status, Task } from '../tasks-view/models/task.model';
import { TaskNode } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  protected tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.TODO,
      assignee: 'john',
      creationDate: new Date().toLocaleDateString(),
      estimation: 10
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.IN_PROGRESS,
      assignee: 'alice',
      creationDate: new Date().toLocaleDateString(),
      estimation: 25
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.TODO,
      assignee: 'bob',
      creationDate: new Date().toLocaleDateString(),
      estimation: 56
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.DONE,
      assignee: 'john',
      creationDate: new Date().toLocaleDateString(),
      estimation: 10
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.IN_PROGRESS,
      assignee: 'alice',
      creationDate: new Date().toLocaleDateString(),
      estimation: 25
    },
    {
      id: 6,
      title: 'Task 5',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      status: Status.TODO,
      assignee: 'bob',
      creationDate: new Date().toLocaleDateString(),
      estimation: 56
    }
  ];

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
        name: Status.BLOCKED.toString(),
        children: []
      },
      {
        name: Status.DONE.toString(),
        children: []
      },
      {
        name: Status.NOT_VALID.toString(),
        children: []
      }
    ]
  }];

  protected tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);
  protected project$: BehaviorSubject<TaskNode[]> = new BehaviorSubject<TaskNode[]>(this.project);

  constructor() {
    this.createProjectTree();
  }

  public getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  public getProjectTree(): TaskNode[] {
    return this.project;
  }

  public getProjectTree$(): Observable<TaskNode[]> {
    return this.project$.asObservable();
  }

  public createProjectTree(): void {
    this.tasks.forEach(task => {
      const categoryIndex = this.project[0].children?.findIndex(c => c.name === task.status.toString())!;
      const tasks = this.project[0].children?.filter(c => c.name === task.status.toString())!;
      if (this.project[0].children && this.project[0].children[categoryIndex]) {
        this.project[0].children[categoryIndex].children?.push({name: task.title});
      }
    });
    this.project$.next(this.project);
  }

  public updateSingleTask(taskData: Task) {
    const taskIndex = this.tasks.findIndex((task: Task) => task.id === taskData.id)!;
    this.tasks[taskIndex] = taskData;
    this.tasks$.next(this.tasks);
  }
}
