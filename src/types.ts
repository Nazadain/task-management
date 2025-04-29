export interface User {
    id: number;
}

export interface Task {
    id: number;
    title: string;
    deadline?: string;
    priority?: number;
    progress: number;
}

