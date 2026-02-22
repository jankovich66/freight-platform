import { Routes } from "@angular/router";
import { Login } from "./pages/login/login";
import { RegisterCarrier } from "./pages/register-carrier/register-carrier";
import { RegisterShipper } from "./pages/register-shipper/register-shipper";
import { Register } from "./pages/register/register";

export const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'register/carrier', component: RegisterCarrier },
    { path: 'register/shipper', component: RegisterShipper }
];
