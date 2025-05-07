import {Drawer} from "@/store/drawer";
import {TasksState} from "@/store/tasks";
import {PanelsState} from "@/store/panels";
import {AuthState} from "@/store/auth";

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
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
    drawer: Drawer,
    tasks: TasksState,
    panels: PanelsState,
    auth: AuthState,
}

