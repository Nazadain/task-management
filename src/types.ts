import {Sidebar} from "@/store/sidebar";
import {TasksState} from "@/store/tasks";

export interface User {
    id: number;
    tasks: number[]
}

export interface Panel {
    id: number;
    title: string;
    colour: string;
}

export interface Task {
    id: number;
    title: string;
    deadline?: string;
    priority?: number;
    progress: number;
    panelId: number;
}

export interface RootState {
    sidebar: Sidebar,
    task: TasksState,
    panel: Panel,
}

