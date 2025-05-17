import {Drawer} from "@/store/drawer";
import {TasksState} from "@/store/tasks";
import {PanelsState} from "@/store/panels";
import {AuthState} from "@/store/auth";
import {BoardState} from "@/store/boards";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Board {
    id: number;
    title: string;
    description: string;
    is_private: boolean;
    role: string;
    panels: Panel[];
}

export interface Panel {
    id: number;
    title: string;
    colour: string;
    position: number;
    tasks: Task[];
}

export interface Task {
    id: number;
    title: string;
    deadline?: string | null;
    priority?: number | null;
    progress: number;
    position: number;
    panel_id: number;
    ships: number[];
}

export interface Invite {
    id: number;
    total_usages: number;
    role: string;
    is_active: boolean;
}

export interface RootState {
    sidebar: Drawer,
    tasks: TasksState,
    panels: PanelsState,
    auth: AuthState,
    boards: BoardState,
}

export enum Role {
    MANAGER = "Менеджер",
    DEVELOPER = "Разработчик",
}

