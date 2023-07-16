export interface GameFieldMeasures {
  width: number;
  height: number;
}

export interface GameFieldOptions extends GameFieldMeasures {
  numberOfMines: number;
}

export interface FieldCellCoordinates {
  x: number;
  y: number;
}

export enum FieldCellLabel {
  None = "None",
  Flag = "Flag",
  Question = "Question",
}

export enum DefaultFieldSize {
  Small = "Small",
  Medium = "Medium",
  Expert = "Expert",
}

export enum CustomFieldSize {
  Custom = "Custom",
}

export type FieldSize = DefaultFieldSize | CustomFieldSize;

export type GameConfigurations = {
  [key in DefaultFieldSize]: GameFieldOptions;
};

export interface GameHighScore {
  id: string;
  time: number;
  playerName: string;
  date: string;
}

export type GameScores = {
  [key in DefaultFieldSize]: GameHighScore[];
};

export interface FieldCell {
  isHidden: boolean;
  label: FieldCellLabel;
  numberOfMinesNearby: number;
  isPlanted: boolean;
  coordinates: FieldCellCoordinates;
  isHighlighted: boolean;
}

export type GameField = FieldCell[][];
