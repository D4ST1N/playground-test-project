import { HexCode, Coordinates } from "@/helpers/generalTypes";

export interface TetrisFieldCell {
  color: HexCode;
  isFilled: boolean;
}

export interface TetrisFigure {
  cells: TetrisFieldCell[][];
  coordinates: Coordinates;
  type: TetrisFigureType;
}

export enum TetrisFigureType {
  I = "I",
  J = "J",
  L = "L",
  O = "O",
  S = "S",
  T = "T",
  Z = "Z",
}

export enum CellType {
  Empty = "Empty",
};

export type TetrisGameField = TetrisFieldCell[][];
