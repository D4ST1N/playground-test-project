import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  GameDifficulty,
  GameField,
  GameScores,
  SudokuArea,
  SudokuSolverResult,
} from "@/helpers/games/sudoku/types";
import { GameStatus } from "@/helpers/generalTypes";
import { useUserStore } from "@/store/user";
import { formatTime, getAssetUrl, soundFabric } from "@/helpers/generalHelpers";
import { SudokuSolver } from "@/components/Games/Sudoku/Game/SudokuSolver";
import {
  generateAreas,
  generateBoard,
  getRandomBoard,
  getSudokuDifficulty,
  shuffleBoard,
} from "@/helpers/games/sudoku/helpers";
import { config } from "@/helpers/games/sudoku/gameConfig";

interface DigitsCount {
  [key: number]: number;
}

const gameAudios = soundFabric([
  {
    key: "win",
    sound: getAssetUrl("/assets/sounds/games/sudoku/win.mp3"),
    volume: 0.6,
  },
  {
    key: "filled",
    sound: getAssetUrl("/assets/sounds/games/sudoku/filled.mp3"),
    volume: 0.3,
  },
  {
    key: "fail",
    sound: getAssetUrl("/assets/sounds/games/sudoku/fail.mp3"),
    volume: 1,
  },
  {
    key: "clear",
    sound: getAssetUrl("/assets/sounds/games/sudoku/clear.mp3"),
    volume: 1,
  },
  {
    key: "theme",
    sound: getAssetUrl("/assets/sounds/games/sudoku/theme.mp3"),
    loop: true,
    volume: 0.3,
  },
]);

export const useSudokuStore = defineStore(
  "sudoku",
  () => {
    const userStore = useUserStore();
    const status: Ref<GameStatus> = ref(GameStatus.NotStarted);
    const scores: Ref<GameScores> = ref<GameScores>({
      [GameDifficulty.Easy]: [],
      [GameDifficulty.Medium]: [],
      [GameDifficulty.Hard]: [],
      [GameDifficulty.Expert]: [],
    });
    const timer = ref(0);
    const gameField: Ref<GameField> = ref([]);
    const initialGameField: Ref<GameField> = ref([]);
    const solvedGameField: Ref<GameField> = ref([]);
    const sudokuSolver = new SudokuSolver();
    const currentDifficulty: Ref<GameDifficulty | null> = ref(null);
    const livesCount: Ref<number> = ref(config.livesCount);
    const areas = ref<SudokuArea[]>([]);
    const musicIsPlaying = ref<boolean>(false);
    const totalEmptyCellsCount = ref<number>(0);

    let timerId: number | null = null;

    const time = computed(() => formatTime(timer.value));
    const emptyCellsCount = computed(() => gameField.value.filter((cell) => !cell).length);

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

      if (gameDifficulty !== GameDifficulty.Expert) {
        do {
          randomSudoku = generateBoard(gameDifficulty);
          result = sudokuSolver.solve(randomSudoku);

          if (result.result) {
            difficulty = getSudokuDifficulty(result);
          } else {
            difficulty = null;
          }
        } while (!result.result || difficulty !== gameDifficulty);

        solvedGameField.value = result.board;
      } else {
        randomSudoku = shuffleBoard(getRandomBoard(), 25);
        solvedGameField.value = [...randomSudoku];
        randomSudoku = randomSudoku.map(() => 0);
      }

      gameField.value = randomSudoku;
      initialGameField.value = [...randomSudoku];
      currentDifficulty.value = gameDifficulty;
      areas.value = generateAreas(solvedGameField.value);
      timer.value = 0;
      livesCount.value = config.livesCount;
      status.value = GameStatus.Playing;
      totalEmptyCellsCount.value = emptyCellsCount.value;
      gameAudios.theme.play();
      musicIsPlaying.value = true;

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
      stopTimer();
      startTimer();
    }

    function startNew() {
      reset();
      stopTimer();
      status.value = GameStatus.NotStarted;
    }

    function setCell(cellIndex: number, value: number) {
      gameField.value[cellIndex] = value;

      if (value === 0) {
        gameAudios.clear.playMultiple();
      }

      if (value !== 0 && solvedGameField.value[cellIndex] !== value) {
        livesCount.value -= 1;
        gameAudios.fail.playMultiple();

        if (livesCount.value === 0) {
          status.value = GameStatus.Defeat;
          stopTimer();
        }
      }

      if (value !== 0 && solvedGameField.value[cellIndex] === value) {
        gameAudios.filled.playMultiple();
      }

      if (_.isEqual(gameField.value, solvedGameField.value)) {
        winGame();
        gameAudios.win.play();
      }
    }

    function winGame(withSolver: boolean = false) {
      status.value = GameStatus.Victory;
      stopTimer();

      if (withSolver || !currentDifficulty.value) return;

      addScore();
    }

    function toggleMusic() {
      if (musicIsPlaying.value) {
        gameAudios.theme.pause();
        musicIsPlaying.value = false;
      } else {
        gameAudios.theme.play();
        musicIsPlaying.value = true;
      }
    }

    function stopMusic() {
      gameAudios.theme.pause();
      musicIsPlaying.value = false;
    }

    function startTimer() {
      timer.value = 0;
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
      livesCount,
      areas,
      musicIsPlaying,
      emptyCellsCount,
      totalEmptyCellsCount,
      startNewGame,
      solve,
      updateField,
      reset,
      restart,
      startNew,
      setCell,
      toggleMusic,
      stopMusic,
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
