import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
        canActivate: [AuthGuard],
        title: 'Home'
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
        title: 'Log In'
    },
    {
        path: 'board',
        loadComponent: () => import('./tasks-board/tasks-board.component').then((m) => m.TasksBoardComponent),
        canActivate: [AuthGuard],
        title: 'Tasks Board'
    },
    {
        path: '**',
        loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
        title: 'Log In'
    }
];
