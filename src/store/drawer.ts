import {Panel, Task} from "@/types";

export interface Drawer {
    isVisible: boolean;
    isActive: boolean;
    content: Content;
}

export interface Content {
    value: Task | Panel | null;
    type: string | null;
    boardId: number | null;
}

interface Payload {
    contentType: string;
    content: Content;
}

export default {
    namespaced: true,
    state: (): Drawer => ({
        isVisible: false,
        isActive: false,
        content: {value: null, type: null, boardId: null},
    }),
    mutations: {
        show(state: Drawer, payload: Payload): void {
            state.isVisible = true;
            state.content = payload.content;
            setTimeout(() => {
                state.isActive = true;
            }, 1)
        },
        hide(state: Drawer): void {
            state.isActive = false;
            setTimeout(() => {
                state.isVisible = false;
                state.content = {value: null, type: null, boardId: null};
            }, 200)
        },
        toggle(state: Drawer): void {
            state.isVisible = !state.isVisible;
        }
    },
    getters: {
        isVisible: (state: Drawer) => state.isVisible
    }
};