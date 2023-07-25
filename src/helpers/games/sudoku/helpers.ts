import {
  CellAreaCells,
  GameDifficulty,
  GameField,
  SudokuArea,
  SudokuSolverSuccessResult,
} from "@/helpers/games/sudoku/types";
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

export function getRandomBoard(): GameField {
  return [...sudokuBases[randomInteger(0, sudokuBases.length - 1)]];
}

export function generateBoard(difficulty: GameDifficulty): GameField {
  const randomBoard = [...sudokuBases[randomInteger(0, sudokuBases.length - 1)]];
  const shuffledBoard = shuffleBoard(randomBoard, 25);
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
  const { backtracks, guesswork } = sudokuSolvingResult;

  if (guesswork < 5 && backtracks < 5) return GameDifficulty.Easy;

  if (guesswork < 15 && backtracks < 20) {
    return GameDifficulty.Medium;
  }

  return GameDifficulty.Hard;
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

export function generateAreas(field: GameField): SudokuArea[] {
  const numberOfAreas = randomInteger(22, 30);
  const numberOfAreasInBlock = Math.floor(numberOfAreas / 9);
  let additionalAreas = numberOfAreas % 9;
  const additionalAreaChance = additionalAreas / 8;
  const areas: SudokuArea[] = [];

  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const blockCoordinates: number[] = [];

      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          // curr += arr[i + k][j + l];
          blockCoordinates.push(rowAndColumnToIndex(i + k, j + l));
        }
      }

      const randomIndexes = randomNumbersInRange(0, 8, numberOfAreasInBlock);
      areas.push(
        ...randomIndexes.map((index) => {
          const cellIndex = blockCoordinates[index];
          return {
            cells: [cellIndex],
            sum: field[cellIndex],
          };
        }),
      );

      const randomNumber = Math.random();

      if (randomNumber < additionalAreaChance && additionalAreas > 0) {
        const [randomIndex] = randomNumbersInRange(0, 8, 1, randomIndexes);
        const cellIndex = blockCoordinates[randomIndex];
        areas.push({
          cells: [cellIndex],
          sum: field[cellIndex],
        });
        additionalAreas -= 1;
      }
    }
  }

  const indexes = Array(81)
    .fill(null)
    .map((_, index) => index);
  const getNotUsedCells = (areas: SudokuArea[]) => {
    return indexes.filter(
      (index) =>
        !areas
          .map((area) => area.cells)
          .flat()
          .includes(index),
    );
  };
  let notUsedCells = getNotUsedCells(areas);
  let maxCall = 5;

  while (notUsedCells.length && maxCall > 0) {
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i];
      notUsedCells = getNotUsedCells(areas);

      if (notUsedCells.length === 0) break;

      const neighbors = area.cells.reduce((n: number[], cell: number) => {
        const cellNeighbors = getCellNeighbors(cell, notUsedCells, n);

        return [...n, ...cellNeighbors];
      }, [] as number[]);

      if (neighbors.length === 0) continue;

      const filteredNeighbors = neighbors.filter(
        (neighbor) => !area.cells.map((cellIndex) => field[cellIndex]).includes(field[neighbor]),
      );

      if (filteredNeighbors.length === 0) continue;

      const randomNeighbor = filteredNeighbors[randomInteger(0, filteredNeighbors.length - 1)];
      area.cells.push(randomNeighbor);
      area.sum += field[randomNeighbor];
    }

    maxCall -= 1;
  }

  if (getNotUsedCells(areas).length !== 0 || areas.some((area) => area.cells.length === 1)) {
    return generateAreas(field);
  }

  return areas;
}

export function isCellFarLeft(cellIndex: number): boolean {
  return cellIndex % 9 === 0;
}

export function isCellFarRight(cellIndex: number): boolean {
  return cellIndex % 9 === 8;
}

export function isCellFarTop(cellIndex: number): boolean {
  return cellIndex < 9;
}

export function isCellFarBottom(cellIndex: number): boolean {
  return cellIndex > 71;
}

export function getCellNeighbors(
  cellIndex: number,
  notUsedCells: number[],
  usedGroupCells: number[],
): number[] {
  const neighbors: number[] = [];
  if (!isCellFarLeft(cellIndex)) {
    const leftCellIndex = cellIndex - 1;

    if (notUsedCells.includes(leftCellIndex) && !usedGroupCells.includes(leftCellIndex)) {
      neighbors.push(leftCellIndex);
    }
  }

  if (!isCellFarRight(cellIndex)) {
    const rightCellIndex = cellIndex + 1;

    if (notUsedCells.includes(rightCellIndex) && !usedGroupCells.includes(rightCellIndex)) {
      neighbors.push(rightCellIndex);
    }
  }

  if (!isCellFarTop(cellIndex)) {
    const topCellIndex = cellIndex - 9;

    if (notUsedCells.includes(topCellIndex) && !usedGroupCells.includes(topCellIndex)) {
      neighbors.push(topCellIndex);
    }
  }

  if (!isCellFarBottom(cellIndex)) {
    const bottomCellIndex = cellIndex + 9;

    if (notUsedCells.includes(bottomCellIndex) && !usedGroupCells.includes(bottomCellIndex)) {
      neighbors.push(bottomCellIndex);
    }
  }

  return neighbors;
}

export function getCellAreaCells(cellIndex: number): CellAreaCells {
  const { row, col } = indexToRowAndColumn(cellIndex);
  const cells: CellAreaCells = {
    left: null,
    right: null,
    top: null,
    bottom: null,
    topLeft: null,
    topRight: null,
    bottomLeft: null,
    bottomRight: null,
  };

  if (row > 0) {
    cells.top = rowAndColumnToIndex(row - 1, col);
  }

  if (row < 8) {
    cells.bottom = rowAndColumnToIndex(row + 1, col);
  }

  if (col > 0) {
    cells.left = rowAndColumnToIndex(row, col - 1);
  }

  if (col < 8) {
    cells.right = rowAndColumnToIndex(row, col + 1);
  }

  if (row > 0 && col > 0) {
    cells.topLeft = rowAndColumnToIndex(row - 1, col - 1);
  }

  if (row > 0 && col < 8) {
    cells.topRight = rowAndColumnToIndex(row - 1, col + 1);
  }

  if (row < 8 && col > 0) {
    cells.bottomLeft = rowAndColumnToIndex(row + 1, col - 1);
  }

  if (row < 8 && col < 8) {
    cells.bottomRight = rowAndColumnToIndex(row + 1, col + 1);
  }

  return cells;
}

export function getAreaSum(field: GameField, area: number[]): number {
  return area.reduce((acc, cell) => {
    return acc + field[cell];
  }, 0);
}

export function getAreasSum(field: GameField, areas: number[][]): SudokuArea[] {
  return areas.map((area) => {
    return {
      cells: area,
      sum: getAreaSum(field, area),
    };
  });
}

export function getCellAreaByCellIndex(cellIndex: number, areas: SudokuArea[]): SudokuArea {
  return areas.find((area) => {
    return area.cells.includes(cellIndex);
  }) as SudokuArea;
}
