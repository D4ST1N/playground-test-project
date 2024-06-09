import _ from "lodash";

import { HexCode } from "@/helpers/generalTypes";
import {
  TetrisFieldCell,
  TetrisFigure,
  TetrisGameField,
  TetrisFigureType,
  CellType,
} from "@/helpers/games/tetris/types";
import { randomInteger } from "@/helpers/generalHelpers";
import { useTetrisStore } from "@/store/games/tetris";

type ColorMapping = {
  [key in TetrisFigureType | CellType.Empty]: HexCode;
};

type ScoreMapping = {
  [key in TetrisFigureType]: number;
};

type FiguresMapping = {
  [key in TetrisFigureType]: TetrisFigure;
};

export const colorMapping: ColorMapping = {
  [TetrisFigureType.I]: "#00f0f0",
  [TetrisFigureType.J]: "#0000f0",
  [TetrisFigureType.L]: "#f0a100",
  [TetrisFigureType.O]: "#f0f000",
  [TetrisFigureType.S]: "#00f000",
  [TetrisFigureType.T]: "#a100f0",
  [TetrisFigureType.Z]: "#f00000",
  [CellType.Empty]: "#fff2",
};

export const figureScoreMapping: ScoreMapping = {
  [TetrisFigureType.I]: 1,
  [TetrisFigureType.J]: 1.5,
  [TetrisFigureType.L]: 1.5,
  [TetrisFigureType.O]: 2,
  [TetrisFigureType.S]: 3,
  [TetrisFigureType.T]: 2.5,
  [TetrisFigureType.Z]: 3,
};

export const emptyCell: TetrisFieldCell = {
  color: colorMapping[CellType.Empty],
  isFilled: false,
};

export const figuresMapping: FiguresMapping = {
  [TetrisFigureType.I]: {
    cells: [
      [
        { color: colorMapping.I, isFilled: true },
        { color: colorMapping.I, isFilled: true },
        { color: colorMapping.I, isFilled: true },
        { color: colorMapping.I, isFilled: true },
      ],
    ],
    coordinates: {
      x: 4,
      y: 0,
    },
    type: TetrisFigureType.I,
  },
  [TetrisFigureType.J]: {
    cells: [
      [
        { color: colorMapping.Empty, isFilled: false },
        { color: colorMapping.Empty, isFilled: false },
        { color: colorMapping.J, isFilled: true },
      ],
      [
        { color: colorMapping.J, isFilled: true },
        { color: colorMapping.J, isFilled: true },
        { color: colorMapping.J, isFilled: true },
      ],
    ],
    coordinates: {
      x: 4,
      y: 0,
    },
    type: TetrisFigureType.J,
  },
  [TetrisFigureType.L]: {
    cells: [
      [
        { color: colorMapping.L, isFilled: true },
        { color: colorMapping.L, isFilled: true },
        { color: colorMapping.L, isFilled: true },
      ],
      [
        { color: colorMapping.Empty, isFilled: false },
        { color: colorMapping.Empty, isFilled: false },
        { color: colorMapping.L, isFilled: true },
      ],
    ],
    coordinates: {
      x: 4,
      y: 0,
    },
    type: TetrisFigureType.L,
  },
  [TetrisFigureType.O]: {
    cells: [
      [
        { color: colorMapping.O, isFilled: true },
        { color: colorMapping.O, isFilled: true },
      ],
      [
        { color: colorMapping.O, isFilled: true },
        { color: colorMapping.O, isFilled: true },
      ],
    ],
    coordinates: {
      x: 4,
      y: 0,
    },
    type: TetrisFigureType.O,
  },
  [TetrisFigureType.S]: {
    cells: [
      [
        { color: colorMapping.Empty, isFilled: false },
        { color: colorMapping.S, isFilled: true },
      ],
      [
        { color: colorMapping.S, isFilled: true },
        { color: colorMapping.S, isFilled: true },
      ],
      [
        { color: colorMapping.S, isFilled: true },
        { color: colorMapping.Empty, isFilled: false },
      ],
    ],
    coordinates: {
      x: 4,
      y: 0,
    },
    type: TetrisFigureType.S,
  },
  [TetrisFigureType.T]: {
    cells: [
      [
        { color: colorMapping.T, isFilled: true },
        { color: colorMapping.Empty, isFilled: false },
      ],
      [
        { color: colorMapping.T, isFilled: true },
        { color: colorMapping.T, isFilled: true },
      ],
      [
        { color: colorMapping.T, isFilled: true },
        { color: colorMapping.Empty, isFilled: false },
      ],
    ],
    coordinates: {
      x: 4,
      y: 0,
    },
    type: TetrisFigureType.T,
  },
  [TetrisFigureType.Z]: {
    cells: [
      [
        { color: colorMapping.Z, isFilled: true },
        { color: colorMapping.Empty, isFilled: false },
      ],
      [
        { color: colorMapping.Z, isFilled: true },
        { color: colorMapping.Z, isFilled: true },
      ],
      [
        { color: colorMapping.Empty, isFilled: false },
        { color: colorMapping.Z, isFilled: true },
      ],
    ],
    coordinates: {
      x: 4,
      y: 0,
    },
    type: TetrisFigureType.Z,
  },
};

export function generateField(width: number, height: number): TetrisGameField {
  return Array(width)
    .fill(null)
    .map(() =>
      Array(height)
        .fill(null)
        .map(() => ({ ...emptyCell })),
    );
}

export function getRandomFigureType(): TetrisFigureType {
  const tetrisStore = useTetrisStore();
  const { numberOfFigures } = tetrisStore;
  const maximalNumberOfFigures = Math.max(...Object.values(numberOfFigures));
  const baseTypeCount = 10;
  const typesArray: TetrisFigureType[] = [];

  Object.entries(numberOfFigures).forEach(([type, count]) => {
    typesArray.push(
      ...Array(
        baseTypeCount + Math.min(baseTypeCount * 3, (maximalNumberOfFigures - count) * 4),
      ).fill(type),
    );
  });

  return typesArray[randomInteger(0, typesArray.length - 1)];
}

export function getRandomFigure(): TetrisFigure {
  const figureType = getRandomFigureType();

  return _.cloneDeep(figuresMapping[figureType]);
}

export function getRowClearBaseScore(numberOfRows: number) {
  // 1 filled row - 100 points
  // 2 filled rows - 300 points
  // 3 filled rows - 700 points
  // 4 filled rows - 1500 points
  return (2 ** numberOfRows - 1) * 100;
}
