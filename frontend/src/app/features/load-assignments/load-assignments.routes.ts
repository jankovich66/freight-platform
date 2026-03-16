import { Routes } from "@angular/router";
import { MyAssignments } from "./pages/my-assignments/my-assignments";

export const LOAD_ASSIGNMENTS_ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'my-assignments', component: MyAssignments }
]