import { Routes } from "@angular/router";
import { MyApplications } from "./pages/my-applications/my-applications";
import { ApplicationDetails } from "./pages/application-details/application-details";

export const LOAD_APPLICATIONS_ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'my-applications', component: MyApplications },
    { path: 'details/:id', component: ApplicationDetails }
];
