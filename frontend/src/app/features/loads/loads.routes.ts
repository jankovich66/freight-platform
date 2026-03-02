import { Routes } from "@angular/router";
import { CreateLoad } from "./pages/create-load/create-load";
import { roleGuard } from "../../core/guards/role.guard";
import { authGuard } from "../../core/guards/auth.guard";
import { LoadList } from "./pages/load-list/load-list";
import { MyLoads } from "./pages/my-loads/my-loads";
import { OpenLoads } from "./pages/open-loads/open-loads";
import { LoadDetails } from "./pages/load-details/load-details";

export const LOADS_ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'create', component: CreateLoad, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['SHIPPER'] } },
    { path: 'all', component: LoadList, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['SHIPPER']} },
    { path: 'my', component: MyLoads, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['SHIPPER']} },
    { path: 'open', component: OpenLoads, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['CARRIER']} },
    { path: 'details/:id', component: LoadDetails, canActivate: [authGuard] }
];
