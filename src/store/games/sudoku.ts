import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

import {
  GameDifficulty,
  GameField,
  GameScores,
  SudokuSolverResult,
} from "@/helpers/games/sudoku/types";
import { GameStatus } from "@/helpers/generalTypes";
import { useUserStore } from "@/store/user";
import { formatTime } from "@/helpers/generalHelpers";
import { SudokuSolver } from "@/components/Games/Sudoku/Game/SudokuSolver";
import { generateBoard, getSudokuDifficulty } from "@/helpers/games/sudoku/helpers";
import _ from "lodash";

interface DigitsCount {
  [key: number]: number;
}

export const useSudokuStore = defineStore(
  "sudoku",
  () => {
    const userStore = useUserStore();
    const status: Ref<GameStatus> = ref(GameStatus.NotStarted);
    const scores: Ref<GameScores> = ref<GameScores>({
      [GameDifficulty.Easy]: [],
      [GameDifficulty.Medium]: [],
      [GameDifficulty.Hard]: [],
    });
    const timer = ref(0);
    const gameField: Ref<GameField> = ref([]);
    const initialGameField: Ref<GameField> = ref([]);
    const solvedGameField: Ref<GameField> = ref([]);
    const sudokuSolver = new SudokuSolver();
    const currentDifficulty: Ref<GameDifficulty | null> = ref(null);
    const errorsCount: Ref<number> = ref(0);
    let timerId: number | null = null;

    const time = computed(() => formatTime(timer.value));

    const digitsUsed = computed((): DigitsCount => {
      if (!gameField.value.length) return {};

      return gameField.value.reduce((acc: DigitsCount, value: number) => {
        if (!value) return acc;

        if (!acc[value]) {
          acc[value] = 0;
        }

        if (value) {
          acc[value] += 1;
        }

        return acc;
      }, {});
    });

    async function startNewGame(gameDifficulty: GameDifficulty = GameDifficulty.Easy) {
      let result: SudokuSolverResult;
      let randomSudoku: GameField;
      let difficulty: GameDifficulty | null;

      do {
        randomSudoku = generateBoard(gameDifficulty);
        result = sudokuSolver.solve(randomSudoku);

        if (result.result) {
          difficulty = getSudokuDifficulty(result);
        } else {
          difficulty = null;
        }
      } while (!result.result || difficulty !== gameDifficulty);

      gameField.value = randomSudoku;
      initialGameField.value = [...randomSudoku];
      solvedGameField.value = result.board;
      currentDifficulty.value = gameDifficulty;
      timer.value = 0;
      errorsCount.value = 0;
      status.value = GameStatus.Playing;

      startTimer();
    }

    function solve() {
      sudokuSolver.stepSolve(initialGameField.value, (result) => {
        if (result.result) {
          gameField.value = result.board;
        }

        winGame(true);
      });
    }

    function updateField(field: GameField) {
      gameField.value = field;
    }

    function reset() {
      gameField.value = [...initialGameField.value];
    }

    function restart() {
      reset();
      startTimer();
    }

    function startNew() {
      reset();
      stopTimer();
      status.value = GameStatus.NotStarted;
    }

    function setCell(cellIndex: number, value: number) {
      gameField.value[cellIndex] = value;

      if (value !== 0 && solvedGameField.value[cellIndex] !== value) {
        errorsCount.value += 1;
      }

      if (_.isEqual(gameField.value, solvedGameField.value)) {
        winGame();
      }
    }

    function winGame(withSolver: boolean = false) {
      status.value = GameStatus.Victory;
      stopTimer();

      if (withSolver || !currentDifficulty.value) return;

      addScore();
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

    function addScore() {
      if (!userStore.user || !currentDifficulty.value) return;

      scores.value[currentDifficulty.value].push({
        id: uuidv4(),
        time: timer.value,
        playerName: userStore.user.name,
        date: new Date().toISOString(),
      });
      scores.value[currentDifficulty.value].sort((a, b) => a.time - b.time);
      scores.value[currentDifficulty.value] = scores.value[currentDifficulty.value].slice(0, 10);
    }

    return {
      status,
      scores,
      time,
      digitsUsed,
      gameField,
      initialGameField,
      solvedGameField,
      currentDifficulty,
      errorsCount,
      startNewGame,
      solve,
      updateField,
      reset,
      restart,
      startNew,
      setCell,
      startTimer,
      stopTimer,
      addScore,
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
