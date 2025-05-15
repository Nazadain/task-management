import {User} from "@/types";

export interface AuthState {
    user: User | null;
    isAuth: boolean;
    authLoading: boolean;
}

export default {
    state: (): AuthState => ({
        user: null,
        isAuth: false,
        authLoading: true,
    }),
    mutations: {
        setUser: (state: AuthState, user: User): void => {
            state.user = user;
        },
        setIsAuth: (state: AuthState, isAuth: boolean): void => {
            state.isAuth = isAuth;
        },
        setAuthLoading: (state: AuthState, isAuth: boolean): void => {
            state.authLoading = isAuth;
        }
    },
    getters: {
        user: (state: AuthState) => state.user,
        isAuth: (state: AuthState) => state.isAuth,
        authLoading: (state: AuthState) => state.authLoading,
    }
}