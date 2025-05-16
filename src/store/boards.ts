import {Board, Panel, Task} from "@/types";
import api from "@/http/axios";

export interface BoardState {
    boards: Board[];
    board: Board | null;
}

export default {
    namespaced: true,
    state: (): BoardState => ({
        boards: [],
        board: null
    }),
    mutations: {
        setBoards(state: BoardState, boards: Board[]): void {
            state.boards = boards;
        },
        setBoard(state: BoardState, board: Board): void {
            state.board = board;
        },
        addBoard(state: BoardState, board: Board): void {
            state.boards.push(board);
        },
        updateBoard(state: BoardState, board: Board): void {

        },
        removeBoard(state: BoardState, board: Board): void {
            state.boards.splice(state.boards.indexOf(board), 1);
        }
    },
    getters: {
        boards: (state: BoardState) => state.boards,
        board: (state: BoardState) => state.board,
    },
    actions: {
        async fetchBoard({commit, dispatch}: any, boardId: number) {
            const response = await
                api.get(`/api/boards/${boardId}`);
            const boardData: Board = response.data;

            const panels = boardData.panels
                .sort((p1: Panel, p2: Panel) =>
                    p1.position - p2.position);

            const allTasks = boardData.panels.flatMap((panel: Panel) =>
                (panel.tasks || []).map((task: Task) => ({
                    ...task,
                    panel_id: panel.id,
                }))
            );
            dispatch("panel/setPanels", panels, {root: true});
            dispatch("task/setTasks", allTasks, {root: true});

            commit("setBoard", boardData);
        }
    }

}