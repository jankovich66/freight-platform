import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import { loadCurrentUserFailure, loadCurrentUserSuccess, login, loginFailure, loginSuccess, logout } from "./auth.actions";

export const authReducer = createReducer(
    initialAuthState,
    on(login, (state) => ({ ...state, isLoading: true, error: null })),
    on(loginSuccess, (state, { user }) => ({ ...state, user, isLoading: false, error: null })),
    on(loginFailure, (state, { error }) => ({ ...state, user: null, isLoading: false, error: error })),
    on(logout, (state) => ({ ...initialAuthState })),
    on(loadCurrentUserSuccess, (state, { user }) => ({ ...state, user })),
    on(loadCurrentUserFailure, (state) => ({ ...state, user: null }))
);
