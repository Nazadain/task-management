import {Panel, Task} from "@/types";

export interface TasksState {
    panels: Panel[];
    tasks: Task[];
}

export default {
    namespaced: true,
    state: (): TasksState => ({
        panels: [],
        tasks: [],
    }),
    mutations: {

    },
    getters: {

    }
}