import { analyze, byteToDigit, digitToByte } from "@/helpers/games/sudoku/helpers";
import { GameField, SudokuSolverResult } from "@/helpers/games/sudoku/types";
import { useSudokuStore } from "@/store/games/sudoku";

export class SudokuSolver {
  gameStore: ReturnType<typeof useSudokuStore>;
  timerId: number | null = null;

  constructor() {
    this.gameStore = useSudokuStore();
  }

  solve(field: GameField): SudokuSolverResult {
    let board = field.map((value) => (value ? digitToByte(value) : 0));
    let backtrack = 0;
    let guesswork = 0;
    let dcount = 0;
    let time = Date.now();

    const solve = () => {
      let { index, moves, len } = analyze(board);
      if (index == null) return true;
      if (len > 1) guesswork++;
      for (let m = 1; moves; m <<= 1) {
        if (moves & m) {
          dcount++;
          board[index] = m;
          if (solve()) return true;
          moves ^= m;
        }
      }
      board[index] = 0;
      ++backtrack;
      return false;
    };

    if (solve()) {
      return {
        result: true,
        board: board.map(byteToDigit),
        digitsPlaced: dcount,
        backtracks: backtrack,
        guesswork: guesswork,
        time: Date.now() - time,
      };
    } else {
      return {
        result: false,
      };
    }
  }

  stepSolve(field: GameField, onEnd: (result: SudokuSolverResult) => void): void {
    const board = field.map((value) => (value ? digitToByte(value) : 0));
    let backtrack = 0;
    let guesswork = 0;
    let dcount = 0;
    let time = Date.now();

    const solve = (cb: (success: boolean) => void) => {
      let { index, moves, len } = analyze(board as GameField);

      if (index == null) return cb(true);

      const loop = (moves: number, m: number) => {
        if (!moves) {
          board[index] = 0;
          ++backtrack;
          cb(false);
        } else if (moves & m) {
          dcount++;
          board![index] = m;
          this.gameStore.updateField(board.map(byteToDigit));
          this.timerId = window.setTimeout(
            () => solve((success) => (success ? cb(true) : loop(moves ^ m, m << 1))),
            100,
          );
        } else loop(moves, m << 1);
      };

      if (len > 1) {
        guesswork++;
        loop(moves, 1);
        return;
      }

      loop(moves, 1);
    };

    solve((success) => {
      if (success) {
        onEnd({
          result: true,
          board: board.map(byteToDigit),
          digitsPlaced: dcount,
          backtracks: backtrack,
          guesswork: guesswork,
          time: Date.now() - time,
        });
      } else {
        return onEnd({
          result: false,
        });
      }
    });
  }
}
