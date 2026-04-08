import { Routes } from "@angular/router";
import { MyAssignments } from "./pages/my-assignments/my-assignments";
import { AssignmentDetails } from "./pages/assignment-details/assignment-details";

export const LOAD_ASSIGNMENTS_ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'my-assignments', component: MyAssignments },
    { path: 'details/:id', component: AssignmentDetails }
]