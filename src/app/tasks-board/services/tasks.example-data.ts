import { Status } from "../tasks-view/models/task.model";

export const tasks1 = [
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
      assignee: 'kamil',
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
      assignee: 'kamil',
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
      assignee: 'kamil',
      creationDate: new Date().toLocaleDateString(),
      estimation: 56
    }
];

export const tasks2 = [
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
    }
];

// for (let i=11 ; i < 100; i++) {
  
//   const a = Math.random();
//   let status1 = Status.IN_PROGRESS;
//   if (a > 0 && a < 0.2) {
//     status1 = Status.TODO;
//   } else if (a > 0.2 && a < 0.4) {
//     status1 = Status.BLOCKED;
//   } else if (a > 0.4 && a < 0.6) {
//     status1 = Status.NOT_VALID;
//   } else if (a > 0.6 && a < 0.8) {
//     status1 = Status.IN_PROGRESS;
//   } else if (a > 0.8 && a < 1) {
//     status1 = Status.DONE;
//   }

//   tasks1.push({
//     id: i,
//     name: `Task ${i}`,
//     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
//     status: status1,
//     assignee: 'bob',
//     creationDate: new Date().toLocaleDateString(),
//     estimation: i*10
//   })
// }