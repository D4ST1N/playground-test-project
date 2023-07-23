export enum GameDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
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
