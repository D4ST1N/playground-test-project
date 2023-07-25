import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

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
  DefaultFieldSize,
  GameScores,
  GameFieldOptions,
  FieldSize,
} from "@/helpers/games/minesweeper/types";
import { GameStatus } from "@/helpers/generalTypes";
import { formatTime, soundFabric, timeout } from "@/helpers/generalHelpers";
import { useUserStore } from "@/store/user";

const gameAudios = soundFabric([
  {
    key: "open",
    sound: "/src/assets/sounds/games/minesweeper/open.mp3",
  },
  {
    key: "victory",
    sound: "/src/assets/sounds/games/minesweeper/tada.mp3",
  },
  {
    key: "lose",
    sound: "/src/assets/sounds/games/minesweeper/lose.mp3",
  },
  {
    key: "tick",
    sound: "/src/assets/sounds/games/minesweeper/tick.mp3",
  },
  {
    key: "recycle",
    sound: "/src/assets/sounds/games/minesweeper/recycle.mp3",
  },
  {
    key: "placeLabel",
    sound: "/src/assets/sounds/games/minesweeper/place-label.mp3",
  },
]);

export const useMinesweeperStore = defineStore(
  "minesweeper",
  () => {
    const userStore = useUserStore();
    const field: Ref<GameField | null> = ref(null);
    const bombsPlanted: Ref<boolean> = ref(false);
    const sizeSelected: Ref<FieldSize> = ref(DefaultFieldSize.Small);
    const selectedConfiguration: Ref<GameFieldOptions> = ref(
      defaultGameConfigurations[DefaultFieldSize.Small],
    );
    const bombsCount: Ref<number> = ref(0);
    const status: Ref<GameStatus> = ref(GameStatus.NotStarted);
    const scores: Ref<GameScores> = ref<GameScores>({
      [DefaultFieldSize.Small]: [],
      [DefaultFieldSize.Medium]: [],
      [DefaultFieldSize.Expert]: [],
    });
    const timer = ref(0);
    let timerId: number | null = null;

    const time = computed(() => formatTime(timer.value));

    const interactionNotAllowed = () =>
      status.value === GameStatus.Victory || status.value === GameStatus.Defeat;

    function startNewGame(configuration: GameFieldOptions, size: FieldSize) {
      field.value = generateField(configuration);
      selectedConfiguration.value = configuration;
      sizeSelected.value = size;
      bombsCount.value = configuration.numberOfMines;
      timer.value = 0;
    }

    function endGame() {
      field.value = null;
      bombsPlanted.value = false;
      sizeSelected.value = DefaultFieldSize.Small;
      selectedConfiguration.value = defaultGameConfigurations[DefaultFieldSize.Small];
      bombsCount.value = 0;
      status.value = GameStatus.NotStarted;
    }

    function populateGame(click: FieldCellCoordinates) {
      if (!field.value) return;

      bombsPlanted.value = true;
      status.value = GameStatus.Playing;
      field.value = populateField(field.value, selectedConfiguration.value.numberOfMines, click);
      startTimer();
    }

    async function openCell(
      cellCoordinates: FieldCellCoordinates,
      byPlayer: boolean = true,
      force: boolean = false,
    ) {
      if (!field.value || (interactionNotAllowed() && !force)) return;

      if (byPlayer) gameAudios.open.play();

      const cell: FieldCell = field.value[cellCoordinates.x][cellCoordinates.y];

      if (!cell.isHidden || cell.label !== FieldCellLabel.None) return;

      cell.isHidden = false;

      if (cell.isPlanted) {
        openRemainMines();
        gameAudios.lose.play();
        status.value = GameStatus.Defeat;
        bombsCount.value -= 1;
        stopTimer();

        return;
      }

      if (cell.numberOfMinesNearby === 0) {
        const neighbors = getCellNeighbors(cellCoordinates, field.value);
        gameAudios.recycle.play();

        await timeout(25);
        neighbors.forEach((neighbor) => {
          openCell(neighbor.coordinates, false);
        });
      }

      checkVictory();
    }

    function toggleLabel(cellCoordinates: FieldCellCoordinates) {
      if (!field.value || interactionNotAllowed()) return;

      const cell: FieldCell = field.value[cellCoordinates.x][cellCoordinates.y];

      if (!cell.isHidden) return;

      gameAudios.placeLabel.play();

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

      gameAudios.tick.play();

      if (cell.numberOfMinesNearby === 0) return;

      const neighbors = getCellNeighbors(cellCoordinates, field.value);
      const hiddenNeighbors = neighbors.filter((neighbor) => neighbor.isHidden);

      if (hiddenNeighbors.length === 0) return;

      const labeledNeighbors = hiddenNeighbors.filter(
        (neighbor) => neighbor.label === FieldCellLabel.Flag,
      );

      if (labeledNeighbors.length === cell.numberOfMinesNearby && !cell.isHidden) {
        hiddenNeighbors.forEach((neighbor) => {
          openCell(neighbor.coordinates, false);
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

        if (sizeSelected.value in DefaultFieldSize) {
          addScore(sizeSelected.value as DefaultFieldSize, timer.value);
        }

        stopTimer();

        gameAudios.victory.play();
      }
    }

    async function openRemainMines() {
      if (!field.value || status.value === GameStatus.Defeat) return;

      for (let i = 0; i < field.value.length; i += 1) {
        for (let j = 0; j < field.value[i].length; j += 1) {
          const cell = field.value[i][j];

          if (!cell.isPlanted || !cell.isHidden) continue;

          const speedMultiplier = Math.ceil(0.2 * (bombsCount.value / 5));
          await timeout(100 / speedMultiplier);

          openCell(cell.coordinates, false, true);
          gameAudios.lose.playMultiple(0.5);
        }
      }

      // field.value.forEach(async (column) => {
      //   column.forEach(async (cell) => {
      //     if (!cell.isPlanted || !cell.isHidden) return;

      //     await timeout(100);
      //     console.log(1);
      //     openCell(cell.coordinates, true, true);
      //   });
      // });
    }

    function startTimer() {
      timerId = window.setInterval(() => {
        timer.value += 1;
      }, 1000);
    }

    function stopTimer() {
      if (!timerId) return;

      clearInterval(timerId);
    }

    function addScore(fieldSize: DefaultFieldSize, time: number) {
      if (!userStore.user) return;

      scores.value[fieldSize].push({
        id: uuidv4(),
        time,
        playerName: userStore.user.name,
        date: new Date().toISOString(),
      });
      scores.value[fieldSize].sort((a, b) => a.time - b.time);
      scores.value[fieldSize] = scores.value[fieldSize].slice(0, 10);
    }

    return {
      field,
      sizeSelected,
      bombsPlanted,
      bombsCount,
      status,
      scores,
      time,
      startNewGame,
      endGame,
      populateGame,
      openCell,
      toggleLabel,
      highlightNeighbors,
    };
  },
  {
    persist: [
      {
        paths: ["scores"],
        storage: localStorage,
      },
    ],
  },
);
