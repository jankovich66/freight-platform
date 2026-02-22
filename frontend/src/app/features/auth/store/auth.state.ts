import { User } from "../../../core/models/user.model";

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
};

export const initialAuthState: AuthState = {
    user: null,
    isLoading: false,
    error: null
};
