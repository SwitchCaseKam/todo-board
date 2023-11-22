import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
        title: 'Home'
    },
    {
        path: 'board',
        loadComponent: () => import('./tasks-board/tasks-board.component').then((m) => m.TasksBoardComponent),
        title: 'Tasks Board'
    }
];
