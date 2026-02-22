import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(selectAuthState, (state) => state.user);

export const selectIsLoading = createSelector(selectAuthState, (state) => state.isLoading);

export const selectIsLoggedIn = createSelector(selectCurrentUser, (user) => !!user);

export const selectUserRole = createSelector(selectAuthState, (state) => state.user?.role);

export const selectIsAuthenticated = createSelector(selectAuthState, (state) => !!state.user?.role);
