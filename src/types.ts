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

