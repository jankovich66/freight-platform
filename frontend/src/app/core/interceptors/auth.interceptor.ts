import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "../../features/auth/services/auth.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const accessToken = authService.getToken();

    if(accessToken) {
        const cloneRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${ accessToken }`
            }
        });
        return next(cloneRequest);
    }

    return next(request);
}
