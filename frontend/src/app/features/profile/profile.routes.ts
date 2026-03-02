import { Routes } from "@angular/router";
import { Profile } from "./pages/profile/profile";
import { EditProfile } from "./pages/edit-profile/edit-profile";

export const PROFILE_ROUTES: Routes = [
    // { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', component: Profile, pathMatch: 'full' },
    { path: 'edit', component: EditProfile }
]
