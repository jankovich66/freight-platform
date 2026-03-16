import { Routes } from '@angular/router';
import { Unauthorized } from './shared/unauthorized/unauthorized';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES), canActivate: [guestGuard] },
    { path: 'loads', loadChildren: () => import('./features/loads/loads.routes').then(m => m.LOADS_ROUTES) },
    { path: 'profile', loadChildren: () => import('./features/profile/profile.routes').then(m => m.PROFILE_ROUTES), canActivate: [authGuard] },
    { path: 'assignments', loadChildren: () => import('./features/load-assignments/load-assignments.routes').then(m => m.LOAD_ASSIGNMENTS_ROUTES), canActivate: [authGuard] },
    { path: 'applications', loadChildren: () => import('./features/load-applications/load-applications.routes').then(m => m.LOAD_APPLICATIONS_ROUTES), canActivate: [authGuard] },
    { path: 'unauthorized', component: Unauthorized },
    { path: '', redirectTo: '', pathMatch: 'full' }
];
