import { Routes } from "@angular/router";
import { MyApplications } from "./pages/my-applications/my-applications";

export const LOAD_APPLICATIONS_ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'my-applications', component: MyApplications }
];
