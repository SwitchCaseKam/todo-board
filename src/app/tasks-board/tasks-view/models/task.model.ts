export interface Task {
    id: number,
    title: string,
    description: string,
    status: Status,
    assignee: string,
    creationDate: string,
    estimation: number
}

export enum Status {
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    DONE = "Done",
    BLOCKED = "Blocked",
    NOT_VALID = "Not Valid"
}
