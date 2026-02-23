import { Routes } from "@angular/router";
import { CreateLoad } from "./pages/create-load/create-load";
import { roleGuard } from "../../core/guards/role.guard";
import { authGuard } from "../../core/guards/auth.guard";

export const LOADS_ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'create', component: CreateLoad, canActivate: [roleGuard, authGuard], data: { expectedRoles: ['SHIPPER'] } }
];
