import {User} from "@/types";

export interface AuthState {
    user: User | null;
    isAuth: boolean;
}

export default {
    state: (): AuthState => ({
        user: null,
        isAuth: false,
    }),
    mutations: {
        setUser: (state: AuthState, user: User): void => {
            state.user = user;
        },
        setIsAuth: (state: AuthState, isAuth: boolean): void => {
            state.isAuth = isAuth;
        }
    },
    getters: {
        user: (state: AuthState) => state.user,
        isAuth: (state: AuthState) => state.isAuth,
    }
}