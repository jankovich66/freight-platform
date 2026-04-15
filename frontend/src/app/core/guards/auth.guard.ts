import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getToken();

    if(!token) {
        return router.createUrlTree(['auth/login']);
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload * 1000 < Date.now();

        if(isExpired) {
            authService.logout();
            return router.createUrlTree(['auth/login']);
        }

        return true;
    }
    catch {
        authService.logout();
        return router.createUrlTree(['auth/login']);
    }

    // if(authService.isLoggedIn()) {
    //     return true;
    // }
    // // console.log('auth guard false');
    // // authService.logout();
    // // return router.navigate(['auth/login']);
    // return router.createUrlTree(['auth/login']);
    // // return false;
}
