import { GameDifficulty, GameField, SudokuSolverSuccessResult } from "@/helpers/games/sudoku/types";
import { randomInteger, randomNumbersInRange } from "@/helpers/generalHelpers";
import { sudokuBases, sudokuDifficultiesMap } from "@/helpers/games/sudoku/entities";

export function getMoves(field: GameField, index: number) {
  let { row, col } = indexToRowAndColumn(index);
  let r1 = 3 * ((row / 3) | 0);
  let c1 = 3 * ((col / 3) | 0);
  let moves = 0;
  for (let r = r1, i = 0; r < r1 + 3; r++) {
    for (let c = c1; c < c1 + 3; c++, i++) {
      moves |=
        field[rowAndColumnToIndex(r, c)] |
        field[rowAndColumnToIndex(row, i)] |
        field[rowAndColumnToIndex(i, col)];
    }
  }
  return moves ^ 511;
}

export function analyze(field: GameField) {
  const allowed = field.map((x, i) => (x ? 0 : getMoves(field, i)));
  let bestIndex;
  let bestLen = 100;

  for (let i = 0; i < 81; i++) {
    if (!field[i]) {
      let moves = allowed[i];
      let len = 0;

      for (let m = 1; moves; m <<= 1) {
        if (moves & m) {
          ++len;

          if (unique(allowed, i, m)) {
            allowed[i] = m;
            len = 1;

            break;
          }

          moves ^= m;
        }
      }

      if (len < bestLen) {
        bestLen = len;
        bestIndex = i;

        if (!bestLen) break;
      }
    }
  }

  return {
    index: bestIndex as number,
    moves: allowed[bestIndex!],
    len: bestLen,
    allowed: allowed,
  };
}

export function unique(allowed: number[], index: number, value: number) {
  let { row, col } = indexToRowAndColumn(index);
  let r1 = 3 * ((row / 3) | 0);
  let c1 = 3 * ((col / 3) | 0);
  let ir = 9 * row;
  let ic = col;
  let uniq_row = true;
  let uniq_col = true;
  let uniq_3x3 = true;

  for (let r = r1; r < r1 + 3; ++r) {
    for (let c = c1; c < c1 + 3; ++c, ++ir, ic += 9) {
      if (uniq_3x3) {
        let i = rowAndColumnToIndex(r, c);
        if (i != index && allowed[i] & value) uniq_3x3 = false;
      }
      if (uniq_row) {
        if (ir != index && allowed[ir] & value) uniq_row = false;
      }
      if (uniq_col) {
        if (ic != index && allowed[ic] & value) uniq_col = false;
      }
      if (!(uniq_3x3 || uniq_row || uniq_col)) return false;
    }
  }
  return uniq_row || uniq_col || uniq_3x3;
}

export function indexToRowAndColumn(index: number) {
  return { row: (index / 9) | 0, col: index % 9 };
}

export function rowAndColumnToIndex(row: number, col: number) {
  return row * 9 + col;
}

export function digitToByte(digit: number) {
  return 1 << (digit - 1);
}

export function byteToDigit(byte: number) {
  let i = 0;
  for (; byte; byte >>= 1, i++);
  return i;
}

export function bytesToDigits(byte: number) {
  let digits = [];
  for (let i = 1; byte; byte >>= 1, i++) {
    if (byte & 1) digits.push(i);
  }
  return digits;
}

export function shuffleBoard(board: GameField, times: number): GameField {
  const direction = randomInteger(0, 1);
  let shuffledBoard = [...board];

  if (direction === 0) {
    shuffledBoard = shuffleRows(board);
  } else {
    shuffledBoard = shuffleColumns(board);
  }

  if (times > 0) {
    return shuffleBoard(shuffledBoard, times - 1);
  }

  return shuffledBoard;
}

export function getRandomIndexes() {
  const third = randomInteger(0, 2);
  const first = randomInteger(0, 2);
  const [second] = randomNumbersInRange(0, 2, 1, [first]);

  return [third * 3 + first, third * 3 + second];
}

export function shuffleRows(board: GameField): GameField {
  const shuffledBoard = [...board];
  const [firstRow, secondRow] = getRandomIndexes();

  for (let i = 0; i < 9; i++) {
    const firstElementIndex = rowAndColumnToIndex(firstRow, i);
    const secondElementIndex = rowAndColumnToIndex(secondRow, i);

    const temp = shuffledBoard[firstElementIndex];
    shuffledBoard[firstElementIndex] = shuffledBoard[secondElementIndex];
    shuffledBoard[secondElementIndex] = temp;
  }

  return shuffledBoard;
}

export function shuffleColumns(board: GameField): GameField {
  const shuffledBoard = [...board];
  const [firstColumn, secondColumn] = getRandomIndexes();

  for (let i = 0; i < 9; i++) {
    const firstElementIndex = rowAndColumnToIndex(firstColumn, i);
    const secondElementIndex = rowAndColumnToIndex(secondColumn, i);

    const temp = shuffledBoard[firstElementIndex];
    shuffledBoard[firstElementIndex] = shuffledBoard[secondElementIndex];
    shuffledBoard[secondElementIndex] = temp;
  }

  return shuffledBoard;
}

export function generateBoard(difficulty: GameDifficulty): GameField {
  const randomBoard = [...sudokuBases[randomInteger(0, sudokuBases.length - 1)]];
  const shuffledBoard = shuffleBoard(randomBoard, 15);
  const cellsToHide = randomNumbersInRange(
    0,
    shuffledBoard.length - 1,
    sudokuDifficultiesMap[difficulty],
  );

  cellsToHide.forEach((cell) => {
    shuffledBoard[cell] = 0;
  });

  return shuffledBoard;
}

export function getSudokuDifficulty(
  sudokuSolvingResult: SudokuSolverSuccessResult,
): GameDifficulty {
  const { backtracks, digitsPlaced, guesswork } = sudokuSolvingResult;

  if (guesswork > 5 || backtracks > 10 || digitsPlaced > 120) {
    return GameDifficulty.Hard;
  }

  if (guesswork > 0 || backtracks > 2) {
    return GameDifficulty.Medium;
  }

  return GameDifficulty.Easy;
}

export function getAllowedNumbers(field: GameField, cellIndex: number): number[] {
  const allowed = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const { row, col } = indexToRowAndColumn(cellIndex);

  for (let x = 0; x < 9; x++) {
    const index = rowAndColumnToIndex(x, col);
    const value = field[index];

    if (value) {
      allowed.delete(value);
    }
  }

  for (let y = 0; y < 9; y++) {
    const index = rowAndColumnToIndex(row, y);
    const value = field[index];

    if (value) {
      allowed.delete(value);
    }
  }

  for (let x = 3 * ((row / 3) | 0); x < 3 * ((row / 3) | 0) + 3; x++) {
    for (let y = 3 * ((col / 3) | 0); y < 3 * ((col / 3) | 0) + 3; y++) {
      const index = rowAndColumnToIndex(x, y);
      const value = field[index];

      if (value) {
        allowed.delete(value);
      }
    }
  }

  return [...allowed];
}
