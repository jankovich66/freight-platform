import { Routes } from '@angular/router';
import { Unauthorized } from './shared/unauthorized/unauthorized';

export const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) },
    { path: 'loads', loadChildren: () => import('./features/loads/loads.routes').then(m => m.LOADS_ROUTES) },
    { path: 'unauthorized', component: Unauthorized },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
