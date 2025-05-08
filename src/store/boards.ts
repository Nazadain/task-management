import {Board} from "@/types";

export interface BoardState {
    boards: Board[];
}

export default {
    namespaced: true,
    state: (): BoardState => ({
        boards: []
    }),
    mutations: {
        setBoards(state: BoardState, boards: Board[]): void {
            state.boards = boards;
        },
        addBoard(state: BoardState, board: Board): void {
            state.boards.push(board);
        },
        removeBoard(state: BoardState, board: Board): void {
            state.boards.splice(state.boards.indexOf(board), 1);
        }
    },
    getters: {
        boards: (state: BoardState) => state.boards,
    }

}