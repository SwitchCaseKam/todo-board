import { STATUSES, Status, Task } from "../tasks-view/models/task.model";
import { BehaviorSubject } from 'rxjs';

export interface TaskNode {
    name: string,
    children?: TaskNode[]
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    level: number;
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

    private tasksMapInitValue = new Map([
        [Status.TODO, []],
        [Status.IN_PROGRESS, []],
        [Status.DONE, []],
        [Status.BLOCKED, []],
        [Status.NOT_VALID, []]
    ]);

    private tasksTreeInitValue = [{
        name: this.name, 
        children: [
          { name: Status.TODO.toString(), children: [] },
          { name: Status.IN_PROGRESS.toString(), children: [] },
          { name: Status.DONE.toString(), children: [] },
          { name: Status.BLOCKED.toString(), children: []},
          { name: Status.NOT_VALID.toString(), children: [] }
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
              { name: Status.TODO.toString(), children: [] },
              { name: Status.IN_PROGRESS.toString(), children: [] },
              { name: Status.DONE.toString(), children: [] },
              { name: Status.BLOCKED.toString(), children: []},
              { name: Status.NOT_VALID.toString(), children: [] }
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
              { name: Status.TODO.toString(), children: [] },
              { name: Status.IN_PROGRESS.toString(), children: [] },
              { name: Status.DONE.toString(), children: [] },
              { name: Status.BLOCKED.toString(), children: []},
              { name: Status.NOT_VALID.toString(), children: [] }
            ]
        }];
        STATUSES.forEach((status, i) => {
            if (this.tasksTree[0].children && this.tasksTree[0].children[i]) {
                const tasks: Task[] = this.tasksMap.get(status)!;
                this.tasksTree[0].children[i].children = tasks.map(t => {
                  return {name: `[${t.id}] ${t.name}`} as TaskNode
                });
            }
        });
        this.tasksTree$ = new BehaviorSubject(this.tasksTree);
    }
}