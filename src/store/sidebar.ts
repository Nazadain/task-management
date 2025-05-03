import {Panel, Task} from "@/types";

export interface Sidebar {
    isVisible: boolean;
    isActive: boolean;
    content: Content;
}

export interface Content {
    value: Task | Panel | null;
    type: string | null;
}

interface Payload {
    contentType: string;
    content: Content;
}

export default {
    namespaced: true,
    state: (): Sidebar => ({
        isVisible: false,
        isActive: false,
        content: {value: null, type: null}
    }),
    mutations: {
        show(state: Sidebar, payload: Payload): void {
            state.isVisible = true;
            state.content = payload.content;
            setTimeout(() => {
                state.isActive = true;
            }, 1)
        },
        hide(state: Sidebar): void {
            state.isActive = false;
            setTimeout(() => {
                state.isVisible = false;
                state.content = {value: null, type: null}
            }, 200)
        },
        toggle(state: Sidebar): void {
            state.isVisible = !state.isVisible;
        }
    },
    getters: {
        isVisible: (state: Sidebar) => state.isVisible
    }
};