import {Panel} from "@/types";

export interface PanelsState {
    panels: Panel[];
}

export default {
    namespaced: true,
    state: (): PanelsState => ({
        panels: [],
    }),
    mutations: {
        setPanels(state: PanelsState, panels: Panel[]) {
            state.panels = panels;
        },
        updatePanel(state: PanelsState, updatedPanel: Panel) {
            const index: number =
                state.panels.findIndex(panel => panel.id === updatedPanel.id);
            state.panels[index] = {...state.panels[index], ...updatedPanel}
        },
        addPanel(state: PanelsState, newPanel: Panel): void {
            state.panels.push(newPanel);
        },
        removePanel(state: PanelsState, id: number): void {
            state.panels = state.panels.filter((p: Panel) => p.id !== id);
        }
    },
    getters: {
        panels: (state: PanelsState) => state.panels,
    }
}