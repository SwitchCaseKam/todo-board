import { Status } from "../tasks-view/models/task.model"

export interface TaskNode {
    name: string,
    children?: TaskNode[]
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    level: number;
}