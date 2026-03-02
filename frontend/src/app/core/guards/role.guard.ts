import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";
import { selectCurrentUser } from "../../features/auth/store/auth.selectors";

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    const store = inject(Store);
    const router = inject(Router);
    const expectedRoles = route.data['expectedRoles'] as string[];

    return store.select(selectCurrentUser).pipe(
        take(1),
        map(user => {
            if(!user) {
                // router.navigate(['/auth/login']);
                return false;
            }

            if(!expectedRoles.includes(user.role)) {
                router.navigate(['/unauthorized']);
                return false;
            }
            return true;
        })
    );
};
