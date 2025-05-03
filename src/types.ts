import {Sidebar} from "@/store/sidebar";
import {TasksState} from "@/store/tasks";
import {PanelsState} from "@/store/panels";

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
    deadline?: string | null;
    priority?: number | null;
    progress: number;
    panelId: number;
}

export interface RootState {
    sidebar: Sidebar,
    tasks: TasksState,
    panels: PanelsState,
}

