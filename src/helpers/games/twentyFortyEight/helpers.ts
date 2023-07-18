import { Coordinates } from "@/helpers/generalTypes";
import { Direction, GameField, Guideline } from "@/helpers/games/twentyFortyEight/types";
import { randomInteger } from "@/helpers/generalHelpers";
import { Tile } from "@/components/Games/TwentyFortyEight/Game/Tile";
import {
  IGameConfig,
  config as defaultGameConfigurations,
} from "@/helpers/games/twentyFortyEight/gameConfig";

export function isCustomConfig(config: IGameConfig): boolean {
  return (
    config.fieldSize !== defaultGameConfigurations.fieldSize ||
    config.startTiles !== defaultGameConfigurations.startTiles ||
    config.fourSpawnChance !== defaultGameConfigurations.fourSpawnChance ||
    config.winValue !== defaultGameConfigurations.winValue
  );
}

export function getEmptyField(width: number, height: number): GameField {
  return Array(width)
    .fill(null)
    .map(() => Array(height).fill(null));
}

export function getRandomFreeCellCoordinates(field: GameField): Coordinates {
  const freeCellsCoordinates: Coordinates[] = [];

  // loop through the field and find all free cells
  field.forEach((column, x) => {
    column.forEach((cell, y) => {
      if (!cell) {
        freeCellsCoordinates.push({ x, y });
      }
    });
  });

  const randomIndex = randomInteger(0, freeCellsCoordinates.length - 1);
  const position = freeCellsCoordinates[randomIndex];
  return position;
}

export function getCoordinates(position: Coordinates, config: IGameConfig): Coordinates {
  return {
    x: position.x * (config.tileSize + config.tileGap) + config.tileGap,
    y: position.y * (config.tileSize + config.tileGap) + config.tileGap,
  };
}

export function getAnimationProgress(startTime: number, duration: number): number {
  const timePassed = Date.now() - startTime;
  const animationProgress = timePassed / duration;

  return animationProgress >= 1 ? 1 : animationProgress;
}

export function getRandomTileValue(config: IGameConfig): number {
  return Math.random() > 1 - config.fourSpawnChance ? 4 : 2;
}

export function getTileColor(value: number): string {
  switch (value) {
    case 2:
      return "#eee4da";
    case 4:
      return "#ede0c8";
    case 8:
      return "#f2b179";
    case 16:
      return "#f59563";
    case 32:
      return "#f67c5f";
    case 64:
      return "#f65e3b";
    case 128:
      return "#edcf72";
    case 256:
      return "#edcc61";
    case 512:
      return "#edc850";
    case 1024:
      return "#edc53f";
    case 2048:
      return "#edc22e";
    default:
      return "#3c3a32";
  }
}

export function getTileTextColor(value: number): string {
  return value > 4 ? "#f9f6f2" : "#776e65";
}

export function getTileFontSize(value: number, config: IGameConfig): number {
  const sizeMultiplier = config.tileSize / defaultGameConfigurations.tileSize;
  switch (value) {
    case 2:
    case 4:
    case 8:
      return 55 * sizeMultiplier;
    case 16:
    case 32:
    case 64:
      return 50 * sizeMultiplier;
    case 128:
    case 256:
    case 512:
      return 45 * sizeMultiplier;
    case 1024:
    case 2048:
      return 40 * sizeMultiplier;
    default:
      return 35 * sizeMultiplier;
  }
}

export function moveTile(
  field: GameField,
  direction: Direction,
  config: IGameConfig,
  updateScore: (score: number) => void,
  setIsWin: () => void,
): boolean {
  const movementCoordinates = getCoordinatesByDirection(direction);
  const movementGuideline = buildMovementGuideline(movementCoordinates, config);
  let anyMove = false;

  movementGuideline.x.forEach((x) => {
    movementGuideline.y.forEach((y) => {
      const currentCell = { x, y };
      const currentTile = getCellContent(field, currentCell, config);

      if (!currentTile) return;

      const { farthestPosition, nextPosition } = getFarthestPosition(
        field,
        currentCell,
        movementCoordinates,
        config,
      );
      const nextTile = getCellContent(field, nextPosition, config);

      if (nextTile && nextTile.value === currentTile.value && !nextTile.isMerged) {
        const newPosition = { ...nextPosition };

        currentTile.merge();
        currentTile.value *= 2;
        field[currentCell.x][currentCell.y] = null;
        field[newPosition.x][newPosition.y] = currentTile;

        currentTile.move(newPosition);
        updateScore(currentTile.value);

        if (currentTile.value === config.winValue) {
          setIsWin();
        }
      } else {
        field[currentCell.x][currentCell.y] = null;
        field[farthestPosition.x][farthestPosition.y] = currentTile;

        currentTile.move(farthestPosition);
      }

      if (!isSamePosition(currentCell, currentTile.nextPosition!)) {
        anyMove = true;
      }
    });
  });

  return anyMove;
}

export function getCoordinatesByDirection(direction: Direction): Coordinates {
  return {
    [Direction.Left]: { x: -1, y: 0 },
    [Direction.Right]: { x: 1, y: 0 },
    [Direction.Up]: { x: 0, y: -1 },
    [Direction.Down]: { x: 0, y: 1 },
  }[direction];
}

export function buildMovementGuideline(
  movementCoordinates: Coordinates,
  config: IGameConfig,
): Guideline {
  const guideline: Guideline = {
    x: [],
    y: [],
  };

  for (let index = 0; index < config.fieldSize; index++) {
    guideline.x.push(index);
    guideline.y.push(index);
  }

  // Reverse guideline if direction is right or down to move tiles by order from right to left or from bottom to top
  if (movementCoordinates.x === 1) {
    guideline.x.reverse();
  }

  if (movementCoordinates.y === 1) {
    guideline.y.reverse();
  }

  return guideline;
}

export function isWithinField(coordinates: Coordinates, config: IGameConfig): boolean {
  return (
    coordinates.x >= 0 &&
    coordinates.x < config.fieldSize &&
    coordinates.y >= 0 &&
    coordinates.y < config.fieldSize
  );
}

export function getCellContent(
  field: GameField,
  coordinates: Coordinates,
  config: IGameConfig,
): Tile | null {
  if (!isWithinField(coordinates, config)) {
    return null;
  }

  return field[coordinates.x][coordinates.y];
}

export function getFarthestPosition(
  field: GameField,
  cellPosition: Coordinates,
  movementCoordinates: Coordinates,
  config: IGameConfig,
): { farthestPosition: Coordinates; nextPosition: Coordinates } {
  let currentCellPosition = { ...cellPosition };
  let previousCell: Coordinates | null = null;

  do {
    previousCell = currentCellPosition;
    currentCellPosition = {
      x: previousCell.x + movementCoordinates.x,
      y: previousCell.y + movementCoordinates.y,
    };
  } while (
    isWithinField(currentCellPosition, config) &&
    !getCellContent(field, currentCellPosition, config)
  );

  return {
    farthestPosition: previousCell,
    nextPosition: currentCellPosition,
  };
}

export function isSamePosition(firstPosition: Coordinates, secondPosition: Coordinates): boolean {
  return firstPosition.x === secondPosition.x && firstPosition.y === secondPosition.y;
}
