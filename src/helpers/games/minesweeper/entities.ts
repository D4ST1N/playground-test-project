import {
  type FieldCell,
  FieldCellLabel,
  type GameConfigurations,
  DefaultFieldSize,
} from "@/helpers/games/minesweeper/types";

export const defaultGameConfigurations: GameConfigurations = {
  [DefaultFieldSize.Small]: {
    width: 9,
    height: 9,
    numberOfMines: 10,
  },
  [DefaultFieldSize.Medium]: {
    width: 16,
    height: 16,
    numberOfMines: 40,
  },
  [DefaultFieldSize.Expert]: {
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
