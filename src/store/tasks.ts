import {Task} from "@/types";

export interface TasksState {
    tasks: Task[];
}

export default {
    namespaced: true,
    state: (): TasksState => ({
        tasks: [],
    }),
    mutations: {
        setTasks(state: TasksState, tasks: Task[]) {
            state.tasks = tasks;
        },
        updateTask(state: TasksState, updatedTask: Task): void {
            const index: number =
                state.tasks.findIndex((task: Task): boolean =>
                    task.id === updatedTask.id);
            state.tasks[index] = {...state.tasks[index], ...updatedTask};
        },
        reorderTasks(state: TasksState, tasks: Task[]): void {
            state.tasks = [...state.tasks.filter(
                (oldTask: Task) =>
                    !tasks.some((newTask: Task) =>
                        oldTask.id === newTask.id)),
                ...tasks];
        },
        addTask(state: TasksState, newTask: Task): void {
            state.tasks.unshift(newTask);
        },
        removeTask(state: TasksState, id: number): void {
            state.tasks = state.tasks.filter((task: Task) => task.id !== id);
        }
    },
    getters: {
        tasks: (state: TasksState) => state.tasks,
    }
}