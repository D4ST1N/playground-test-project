import {
  type FieldCell,
  FieldCellLabel,
  FieldSize,
  type GameConfigurations,
} from "@/helpers/games/minesweeper/types";

export const defaultGameConfigurations: GameConfigurations = {
  [FieldSize.Small]: {
    width: 9,
    height: 9,
    numberOfMines: 10,
  },
  [FieldSize.Medium]: {
    width: 16,
    height: 16,
    numberOfMines: 40,
  },
  [FieldSize.Expert]: {
    width: 30,
    height: 16,
    numberOfMines: 99,
  },
};

export const emptyCell: FieldCell = {
  isHidden: true,
  label: FieldCellLabel.None,
  numberOfMinesNearby: 0,
  isPlanted: false,
  coordinates: { x: 0, y: 0 },
  isHighlighted: false,
};
