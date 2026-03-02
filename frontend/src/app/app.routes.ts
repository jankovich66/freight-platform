import { Routes } from '@angular/router';
import { Unauthorized } from './shared/unauthorized/unauthorized';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES), canActivate: [guestGuard] },
    { path: 'loads', loadChildren: () => import('./features/loads/loads.routes').then(m => m.LOADS_ROUTES) },
    { path: 'unauthorized', component: Unauthorized },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
