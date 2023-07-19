import _ from "lodash";

import {
  type GameFieldMeasures,
  type GameFieldOptions,
  type FieldCellCoordinates,
  type GameField,
  type FieldCell,
  DefaultFieldSize,
} from "@/helpers/games/minesweeper/types";
import { defaultGameConfigurations, emptyCell } from "@/helpers/games/minesweeper/entities";
import { randomNumbersInRange } from "@/helpers/generalHelpers";

export function getGameFieldMeasures(field: GameField): GameFieldMeasures {
  const [column] = field;
  const width = field.length;
  const height = column.length;

  return {
    width,
    height,
  };
}

export function getGameFieldSize(field: GameField): number {
  const { width, height } = getGameFieldMeasures(field);

  return width * height;
}

export function fieldCellCoordinatesToIndex(
  coordinates: FieldCellCoordinates,
  field: GameField,
): number {
  const { width } = getGameFieldMeasures(field);

  return coordinates.y * width + coordinates.x;
}

export function fieldCellIndexToCoordinates(index: number, field: GameField): FieldCellCoordinates {
  const { width } = getGameFieldMeasures(field);

  return {
    x: index % width,
    y: Math.floor(index / width),
  };
}

export function getCellNeighbors(coordinates: FieldCellCoordinates, field: GameField): FieldCell[] {
  const { width, height } = getGameFieldMeasures(field);
  const { x, y } = coordinates;
  const neighbors = [];

  if (x > 0) {
    neighbors.push({ ...field[x - 1][y] });
  }

  if (x < width - 1) {
    neighbors.push({ ...field[x + 1][y] });
  }

  if (y > 0) {
    neighbors.push({ ...field[x][y - 1] });
  }

  if (y < height - 1) {
    neighbors.push({ ...field[x][y + 1] });
  }

  if (x > 0 && y > 0) {
    neighbors.push({ ...field[x - 1][y - 1] });
  }

  if (x > 0 && y < height - 1) {
    neighbors.push({ ...field[x - 1][y + 1] });
  }

  if (x < width - 1 && y > 0) {
    neighbors.push({ ...field[x + 1][y - 1] });
  }

  if (x < width - 1 && y < height - 1) {
    neighbors.push({ ...field[x + 1][y + 1] });
  }

  return neighbors;
}

export function generateField(
  fieldOptions: GameFieldOptions = defaultGameConfigurations[DefaultFieldSize.Small],
): GameField {
  return Array(fieldOptions.width)
    .fill(null)
    .map((_column, x) =>
      Array(fieldOptions.height)
        .fill(null)
        .map((_cell, y) => ({
          ...emptyCell,
          coordinates: {
            x,
            y,
          },
        })),
    );
}

export function populateField(
  field: GameField,
  numberOfMines: number,
  firstClickCoordinates: FieldCellCoordinates,
): GameField {
  const newField: GameField = _.cloneDeep(field);
  const minedCells = randomNumbersInRange(0, getGameFieldSize(field) - 1, numberOfMines, [
    fieldCellCoordinatesToIndex(firstClickCoordinates, field),
  ]);
  const minedCellsCoordinates = minedCells.map((cellIndex) =>
    fieldCellIndexToCoordinates(cellIndex, field),
  );

  minedCellsCoordinates.forEach((coordinate) => {
    newField[coordinate.x][coordinate.y].isPlanted = true;
  });

  // calculate number of mines nearby for all cells
  newField.forEach((column, columnIndex) => {
    column.forEach((cell, cellIndex) => {
      cell.numberOfMinesNearby = getCellNeighbors(
        { x: columnIndex, y: cellIndex },
        newField,
      ).filter((cell) => cell.isPlanted).length;
    });
  });

  return newField;
}
