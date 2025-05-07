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
            const task = state.tasks.find(t => t.id === updatedTask.id);
            if (!task) {
                console.warn(`Task with id ${updatedTask.id} not found`);
                return;
            }

            Object.assign(task, updatedTask);
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