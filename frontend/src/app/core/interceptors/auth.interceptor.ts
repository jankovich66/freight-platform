import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "../../features/auth/services/auth.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { Store } from "@ngrx/store";
import { logout } from "../../features/auth/store/auth.actions";

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const store = inject(Store);

    const accessToken = authService.getToken();

    let clonedRequest = request;

    if(accessToken) {
        clonedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${ accessToken }`
            }
        });
    }

    return next(clonedRequest).pipe(
        tap({
            error: (err) => {
                if(err.status === 401) {
                    authService.logout();
                    store.dispatch(logout());
                    router.navigate(['/auth/login']);
                }
            }
        })
    )
}
