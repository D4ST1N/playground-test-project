import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

import { NumberOfFigures, TetrisFigureType } from "@/helpers/games/tetris/types";
import { useUserStore } from "@/store/user";
import { migrations } from "@/store/migrations";

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

export const useTetrisStore = defineStore(
  "tetris",
  () => {
    const userStore = useUserStore();
    const numberOfFigures = ref<NumberOfFigures>({ ...initialNumbers });
    const scores = ref<GameHighScore[]>([]);
    const current = ref<string>("");

    function setCurrentGameId(currentId: string) {
      current.value = currentId;
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
