export interface Sidebar {
    isVisible: boolean;
    isActive: boolean;
    contentType: string | null;
}

interface Payload {
    contentType: string;
}

export default {
    namespaced: true,
    state: (): Sidebar => ({
        isVisible: false,
        isActive: false,
        contentType: null,
    }),
    mutations: {
        show(state: Sidebar, payload: Payload): void {
            state.isVisible = true;
            state.contentType = payload.contentType;
            setTimeout(() => {
                state.isActive = true;
            }, 1)
        },
        hide(state: Sidebar): void {
            state.isActive = false;
            setTimeout(() => {
                state.contentType = null;
                state.isVisible = false;
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