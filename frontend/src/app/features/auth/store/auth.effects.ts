import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    constructor(
        private authService: AuthService
    ) {
        console.log('Action is: ', this.actions$);
    }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap((action) => 
                this.authService.login(action.email, action.password)
                    .pipe(
                        map((response) => AuthActions.loginSuccess({ user: response.user })),
                        catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
                    )
            )
        )
    )
}
