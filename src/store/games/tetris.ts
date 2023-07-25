import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

import { NumberOfFigures, TetrisFigureType } from "@/helpers/games/tetris/types";
import { useUserStore } from "@/store/user";
import { migrations } from "@/store/migrations";
import { soundFabric } from "@/helpers/generalHelpers";

const initialNumbers: NumberOfFigures = {
  [TetrisFigureType.I]: 0,
  [TetrisFigureType.J]: 0,
  [TetrisFigureType.L]: 0,
  [TetrisFigureType.O]: 0,
  [TetrisFigureType.S]: 0,
  [TetrisFigureType.T]: 0,
  [TetrisFigureType.Z]: 0,
};

export interface GameHighScore {
  id: string;
  score: number;
  playerName: string;
  date: string;
}

let initialScores: GameHighScore[] = [];
if (APP_VERSION === "0.0.1") {
  const oldScores = migrations[APP_VERSION]();

  if (oldScores !== undefined) {
    initialScores = oldScores;
  }
}

const soundEffects = soundFabric([
  {
    key: "theme1",
    sound: "/src/assets/sounds/games/tetris/theme1.mp3",
    loop: true,
    volume: 0.3,
  },
  {
    key: "theme2",
    sound: "/src/assets/sounds/games/tetris/theme2.mp3",
    loop: true,
    volume: 0.3,
  },
  {
    key: "theme3",
    sound: "/src/assets/sounds/games/tetris/theme3.mp3",
    loop: true,
    volume: 0.3,
  },
]);

export const useTetrisStore = defineStore(
  "tetris",
  () => {
    const userStore = useUserStore();
    const numberOfFigures = ref<NumberOfFigures>({ ...initialNumbers });
    const scores = ref<GameHighScore[]>([]);
    const currentTheme = ref<string>("theme1");
    const musicStopped = ref<boolean>(false);
    const current = ref<string>("");

    function setCurrentGameId(currentId: string) {
      current.value = currentId;
    }

    function startMusic() {
      soundEffects[currentTheme.value].play();
      soundEffects[currentTheme.value].changeVolume(0.3);
      musicStopped.value = false;
    }

    function stopMusic() {
      soundEffects[currentTheme.value].pause();
      musicStopped.value = true;
    }

    function increaseDifficulty() {
      const previousTheme = currentTheme.value;

      if (currentTheme.value === "theme1") {
        currentTheme.value = "theme2";
      } else if (currentTheme.value === "theme2") {
        currentTheme.value = "theme3";
      } else {
        return;
      }

      let volumeLevel = 0.3;

      const startNewTheme = () => {
        startMusic();
      };

      const loop = () => {
        setTimeout(() => {
          if (volumeLevel >= 0) {
            volumeLevel -= 0.01;
            soundEffects[previousTheme].changeVolume(volumeLevel <= 0 ? 0 : volumeLevel);
            loop();
          } else {
            soundEffects[previousTheme].pause();
            startNewTheme();
          }
        }, 50);
      };

      loop();
    }

    function setScore(gameScore: number, id: string) {
      if (!userStore.user) return;

      const existedScore = scores.value.find((score) => score.id === id);

      if (existedScore) {
        existedScore.score = gameScore;
        existedScore.date = new Date().toISOString();
        existedScore.playerName = userStore.user.name;
      } else {
        scores.value.push({
          id: id || uuidv4(),
          score: gameScore,
          playerName: userStore.user.name,
          date: new Date().toISOString(),
        });
      }

      reduceScores();
    }

    function reduceScores() {
      scores.value.sort((a, b) => b.score - a.score);
      scores.value = scores.value.slice(0, 10);
    }

    function addNewFigure(figureType: TetrisFigureType) {
      numberOfFigures.value[figureType] += 1;
    }

    function reset() {
      numberOfFigures.value = { ...initialNumbers };
    }

    return {
      numberOfFigures,
      scores,
      current,
      musicStopped,
      startMusic,
      stopMusic,
      increaseDifficulty,
      setCurrentGameId,
      setScore,
      addNewFigure,
      reset,
      reduceScores,
    };
  },
  {
    persist: {
      paths: ["scores"],
      afterRestore: (ctx) => {
        if (initialScores.length > 0) {
          ctx.store.scores.push(...initialScores);
          ctx.store.reduceScores();

          localStorage.removeItem("score");
        }
      },
    },
  },
);
