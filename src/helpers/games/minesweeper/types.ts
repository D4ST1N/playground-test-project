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

export enum FieldSize {
  Small = "Small",
  Medium = "Medium",
  Expert = "Expert",
}

export type GameConfigurations = {
  [key in FieldSize]: GameFieldOptions;
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
