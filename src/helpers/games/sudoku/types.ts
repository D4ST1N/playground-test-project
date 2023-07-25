import { VNode } from "vue";

export enum GameDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
  Expert = "Expert",
}

export interface GameHighScore {
  id: string;
  time: number;
  playerName: string;
  date: string;
}

export type GameScores = {
  [key in GameDifficulty]: GameHighScore[];
};

export type GameField = number[];

export interface SudokuSolverSuccessResult {
  result: true;
  board: number[];
  digitsPlaced: number;
  backtracks: number;
  guesswork: number;
  time: number;
}

export interface SudokuSolverFailureResult {
  result: false;
  board?: never;
  digitsPlaced?: never;
  backtracks?: never;
  guesswork?: never;
  time?: never;
}

export type SudokuSolverResult = SudokuSolverSuccessResult | SudokuSolverFailureResult;

export interface SudokuArea {
  cells: number[];
  sum: number;
}

export interface CellAreaCells {
  left: number | null;
  right: number | null;
  top: number | null;
  bottom: number | null;
  topLeft: number | null;
  topRight: number | null;
  bottomLeft: number | null;
  bottomRight: number | null;
}

export interface HTMLElementWithVNode extends EventTarget {
  __vnode: VNode;
}
