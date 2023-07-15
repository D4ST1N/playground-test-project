import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import {
  generateField,
  populateField,
  getCellNeighbors,
} from "@/helpers/games/minesweeper/helpers";
import { defaultGameConfigurations } from "@/helpers/games/minesweeper/entities";
import {
  type FieldCellCoordinates,
  type GameField,
  type FieldCell,
  FieldCellLabel,
  FieldSize,
} from "@/helpers/games/minesweeper/types";
import { GameStatus } from "@/helpers/generalTypes";
import { timeout } from "@/helpers/generalHelpers";

export const useMinesweeperStore = defineStore("minesweeper", () => {
  const field: Ref<GameField | null> = ref(null);
  const bombsPlanted: Ref<boolean> = ref(false);
  const sizeSelected: Ref<FieldSize> = ref(FieldSize.Small);
  const bombsCount: Ref<number> = ref(0);
  const status: Ref<GameStatus> = ref(GameStatus.NotStarted);

  const interactionNotAllowed = () =>
    status.value === GameStatus.Victory || status.value === GameStatus.Defeat;

  function startNewGame(size: FieldSize) {
    field.value = generateField(defaultGameConfigurations[size]);
    sizeSelected.value = size;
    bombsCount.value = defaultGameConfigurations[size].numberOfMines;
  }

  function endGame() {
    field.value = null;
    bombsPlanted.value = false;
    sizeSelected.value = FieldSize.Small;
    bombsCount.value = 0;
    status.value = GameStatus.NotStarted;
  }

  function populateGame(click: FieldCellCoordinates) {
    if (!field.value) return;

    bombsPlanted.value = true;
    status.value = GameStatus.Playing;
    field.value = populateField(
      field.value,
      defaultGameConfigurations[sizeSelected.value].numberOfMines,
      click,
    );
  }

  async function openCell(cellCoordinates: FieldCellCoordinates) {
    if (!field.value || interactionNotAllowed()) return;

    const cell: FieldCell = field.value[cellCoordinates.x][cellCoordinates.y];

    if (!cell.isHidden || cell.label !== FieldCellLabel.None) return;

    cell.isHidden = false;

    if (cell.isPlanted) {
      status.value = GameStatus.Defeat;

      return;
    }

    if (cell.numberOfMinesNearby === 0) {
      const neighbors = getCellNeighbors(cellCoordinates, field.value);

      await timeout(25);
      neighbors.forEach((neighbor) => {
        openCell(neighbor.coordinates);
      });
    }

    checkVictory();
  }

  function toggleLabel(cellCoordinates: FieldCellCoordinates) {
    if (!field.value || interactionNotAllowed()) return;

    const cell: FieldCell = field.value[cellCoordinates.x][cellCoordinates.y];

    if (!cell.isHidden) return;

    if (cell.label === FieldCellLabel.None) {
      cell.label = FieldCellLabel.Flag;
      bombsCount.value -= 1;
    } else if (cell.label === FieldCellLabel.Flag) {
      cell.label = FieldCellLabel.Question;
      bombsCount.value += 1;
    } else {
      cell.label = FieldCellLabel.None;
    }
  }

  async function highlightNeighbors(cellCoordinates: FieldCellCoordinates) {
    if (!field.value || interactionNotAllowed()) return;

    const cell: FieldCell = field.value[cellCoordinates.x][cellCoordinates.y];

    if (cell.numberOfMinesNearby === 0) return;

    const neighbors = getCellNeighbors(cellCoordinates, field.value);
    const hiddenNeighbors = neighbors.filter((neighbor) => neighbor.isHidden);

    if (hiddenNeighbors.length === 0) return;

    const labeledNeighbors = hiddenNeighbors.filter(
      (neighbor) => neighbor.label === FieldCellLabel.Flag,
    );

    if (labeledNeighbors.length === cell.numberOfMinesNearby && !cell.isHidden) {
      hiddenNeighbors.forEach((neighbor) => {
        openCell(neighbor.coordinates);
      });
    } else {
      hiddenNeighbors.forEach((neighbor) => {
        if (neighbor.label !== FieldCellLabel.None || !field.value) return;

        field.value[neighbor.coordinates.x][neighbor.coordinates.y].isHighlighted = true;
      });

      await timeout(250);

      hiddenNeighbors.forEach((neighbor) => {
        if (!field.value) return;

        field.value[neighbor.coordinates.x][neighbor.coordinates.y].isHighlighted = false;
      });
    }
  }

  function checkVictory() {
    if (!field.value) return;

    const allNotMinedCellsOpened = field.value.every((column) =>
      column.every((cell) => (cell.isPlanted ? cell.isPlanted : !cell.isHidden)),
    );

    if (allNotMinedCellsOpened) {
      status.value = GameStatus.Victory;
    }
  }

  return {
    field,
    bombsPlanted,
    bombsCount,
    status,
    startNewGame,
    endGame,
    populateGame,
    openCell,
    toggleLabel,
    highlightNeighbors,
  };
});
