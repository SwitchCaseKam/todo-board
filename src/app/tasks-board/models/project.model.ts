import { STATUSES, Status, Task } from "../tasks-view/models/task.model";
import { BehaviorSubject } from 'rxjs';

export interface TaskNode {
    name: string,
    assignee?: string,
    children?: TaskNode[],
    rootProjectName?: string
}

export interface FlatNode {
    expandable: boolean,
    name: string,
    level: number,
}

export const tasksMapInitValue = new Map([
    [Status.TODO, []],
    [Status.IN_PROGRESS, []],
    [Status.DONE, []],
    [Status.BLOCKED, []],
    [Status.NOT_VALID, []]
]);


export class Project {
    public name: string = '';
    public tasks: Task[];
    public tasksMap:  Map<Status, Task[]>;
    public tasksTree: TaskNode[];
    
    public tasks$: BehaviorSubject<Task[]>;
    public tasksMap$: BehaviorSubject<Map<Status, Task[]>>;
    public tasksTree$: BehaviorSubject<TaskNode[]>;

    private tasksTreeInitValue = [{
        name: this.name,
        children: [
          { name: Status.TODO.toString(), children: [], rootProjectName: this.name },
          { name: Status.IN_PROGRESS.toString(), children: [], rootProjectName: this.name },
          { name: Status.DONE.toString(), children: [], rootProjectName: this.name },
          { name: Status.BLOCKED.toString(), children: [], rootProjectName: this.name },
          { name: Status.NOT_VALID.toString(), children: [], rootProjectName: this.name }
        ]
    }];
    
    constructor(name: string, tasks: Task[] = []) {
        this.name = name;
        this.tasks = tasks;
        this.tasks$ = new BehaviorSubject(this.tasks);
        this.tasksTreeInitValue[0].name = name;
        this.tasksMap = new Map([
            [Status.TODO, []],
            [Status.IN_PROGRESS, []],
            [Status.DONE, []],
            [Status.BLOCKED, []],
            [Status.NOT_VALID, []]
        ]);
        this.tasksTree = [{
            name: this.name, 
            children: [
              { name: Status.TODO.toString(), children: [], rootProjectName: this.name },
              { name: Status.IN_PROGRESS.toString(), children: [], rootProjectName: this.name },
              { name: Status.DONE.toString(), children: [], rootProjectName: this.name },
              { name: Status.BLOCKED.toString(), children: [], rootProjectName: this.name},
              { name: Status.NOT_VALID.toString(), children: [], rootProjectName: this.name }
            ]
        }];
        this.createTasksMap();
        this.createTasksTree();
        this.tasksMap$ = new BehaviorSubject(this.tasksMap);
        this.tasksTree$ = new BehaviorSubject(this.tasksTree);
    }

    public updateData(tasks: Task[]) {
        this.tasks = tasks;
        this.tasks$.next(this.tasks);
        this.createTasksMap();
        this.createTasksTree();
    }

    private createTasksMap(): void {
        this.tasksMap = new Map([
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
        this.tasksMap$ = new BehaviorSubject(this.tasksMap);
    }

    private createTasksTree(): void {
        this.tasksTree = [{
            name: this.name, 
            children: [
              { name: Status.TODO.toString(), children: [], rootProjectName: this.name },
              { name: Status.IN_PROGRESS.toString(), children: [], rootProjectName: this.name },
              { name: Status.DONE.toString(), children: [], rootProjectName: this.name },
              { name: Status.BLOCKED.toString(), children: [], rootProjectName: this.name},
              { name: Status.NOT_VALID.toString(), children: [], rootProjectName: this.name }
            ]
        }];
        STATUSES.forEach((status, i) => {
            if (this.tasksTree[0].children && this.tasksTree[0].children[i]) {
                const tasks: Task[] = this.tasksMap.get(status)!;
                this.tasksTree[0].children[i].children = tasks.map(t => {
                    return {name: `[${t.id}] ${t.name} */&%^${this.name}`, assignee: t.assignee, rootProjectName: this.name} as TaskNode
                });
            }
        });
        this.tasksTree$ = new BehaviorSubject(this.tasksTree);
    }
}