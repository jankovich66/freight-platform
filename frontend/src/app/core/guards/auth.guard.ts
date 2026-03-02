import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.isLoggedIn()) {
        return true;
    }
    // console.log('auth guard false');
    // authService.logout();
    // return router.navigate(['auth/login']);
    return router.createUrlTree(['auth/login']);
    // return false;
}
