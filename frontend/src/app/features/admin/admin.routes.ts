import { Routes } from "@angular/router";
import { AdminDashboard } from "./pages/admin-dashboard/admin-dashboard";
import { AdminUsers } from "./pages/admin-users/admin-users";
import { AdminLoads } from "./pages/admin-loads/admin-loads";
import { AdminApplications } from "./pages/admin-applications/admin-applications";
import { AdminAssignments } from "./pages/admin-assignments/admin-assignments";
import { AdminAssignmentsDetails } from "./pages/admin-assignments-details/admin-assignments-details";
import { AdminApplicationsDetails } from "./pages/admin-applications-details/admin-applications-details";

export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'dashboard', component: AdminDashboard },
    { path: 'users', component: AdminUsers },
    { path: 'loads', component: AdminLoads },
    { path: 'applications', component: AdminApplications },
    { path: 'assignments', component: AdminAssignments },
    { path: 'assignments/:carrierId', component: AdminAssignmentsDetails },
    { path: 'applications/:carrierId', component: AdminApplicationsDetails }
]