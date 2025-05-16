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
            console.log(updatedTask);
            const task = state.tasks
                .find((t: Task) => t.id === updatedTask.id);
            if (!task) {
                console.warn(`Task with id ${updatedTask.id} not found`);
                return;
            }

            Object.assign(task, updatedTask);
        },
        reorderTasks(state: TasksState, tasks: Task[]) {
            tasks.forEach(newTask => {
                const index = state.tasks.findIndex(t => t.id === newTask.id);
                if (index !== -1) {
                    state.tasks.splice(index, 1, newTask);
                } else {
                    state.tasks.push(newTask);
                }
            });
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
    },
    actions: {
        setTasks({commit}: any, tasks: Task[]) {
            commit("setTasks", tasks);
        }
    }
}