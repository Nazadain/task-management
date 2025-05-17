import {User} from "@/types";

export interface UsersState {
    users: User[];
}

export default {
    namespaced: true,
    state: (): UsersState => ({
        users: [],
    }),

    mutations: {
        setUsers(state: UsersState, users: User[]): void {
            state.users = users;
        },

        updateUsers(state: UsersState, users: User[] | User): void {
            const updateArray = Array.isArray(users) ? users : [users];

            updateArray.forEach(updatedUser => {
                const index = state.users.findIndex(user => user.id === updatedUser.id);
                if (index !== -1) {
                    state.users[index] = {...state.users[index], ...updatedUser};
                }
            });
        },

        deleteUsers(state: UsersState, ids: number[] | number): void {
            const idArray = Array.isArray(ids) ? ids : [ids];
            state.users = state.users.filter(user => !idArray.includes(user.id));
        },

        addUsers(state: UsersState, users: User[] | User): void {
            const addArray = Array.isArray(users) ? users : [users];
            for (const user of addArray) {
                if (!state.users.find(u => u.id === user.id)) {
                    state.users.push(user);
                }
            }
        },
    },

    getters: {
        users: (state: UsersState) => state.users,
    }
}