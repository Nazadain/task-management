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
        updatePanelPosition(state: PanelsState, { id, position }: any) {
            const panel = state.panels.find(p => p.id === id);
            if (panel) {
                panel.position = position;
            }
        },
        reorderPanels(state: PanelsState, panels: Panel[]) {
            state.panels = [...panels];
        },
        addPanel(state: PanelsState, newPanel: Panel): void {
            state.panels.push(newPanel);
        },
        removePanel(state: PanelsState, id: number): void {
            const index = state.panels.findIndex(p => p.id === id);
            if (index !== -1) {
                state.panels.splice(index, 1);
            }
        }
    },
    getters: {
        panels: (state: PanelsState) => state.panels,
    },
    actions: {
        setPanels({commit}: any, panels: Panel[]): void {
            commit("setPanels", panels);
        }
    }
}