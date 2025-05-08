import {Drawer} from "@/store/drawer";
import {TasksState} from "@/store/tasks";
import {PanelsState} from "@/store/panels";
import {AuthState} from "@/store/auth";
import {BoardState} from "@/store/boards";

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    tasks: number[]
}

export interface Board {
    id: number;
    title: string;
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
    boards: BoardState,
}

