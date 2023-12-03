export interface Task {
    id: number,
    name: string,
    description: string,
    status: Status,
    assignee: string,
    creationDate?: string,
    estimation: number
}

export enum Status {
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    DONE = "Done",
    BLOCKED = "Blocked",
    NOT_VALID = "Not Valid"
};

export const STATUSES: Status[] = [
    Status.TODO,
    Status.IN_PROGRESS,
    Status.DONE,
    Status.BLOCKED,
    Status.NOT_VALID
];
