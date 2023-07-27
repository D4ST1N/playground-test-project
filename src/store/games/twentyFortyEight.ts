import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "@/store/user";
import { GameStatus } from "@/helpers/generalTypes";
import { TwentyFortyEight } from "@/components/Games/TwentyFortyEight/Game/TwentyFortyEight";
import { IGameConfig, config as gameConfig } from "@/helpers/games/twentyFortyEight/gameConfig";

export interface GameHighScore {
  id: string;
  score: number;
  playerName: string;
  date: string;
}

export const useTwentyFortyEightStore = defineStore(
  "twentyFortyEight",
  () => {
    const userStore = useUserStore();
    const scores = ref<GameHighScore[]>([]);
    const current = ref<string>("");
    const status = ref<GameStatus>(GameStatus.NotStarted);
    const currentScore = ref<number>(0);
    const selectedConfig = ref<IGameConfig>(gameConfig);
    const maximalNumber = ref<number>(0);
    const game = ref<TwentyFortyEight | null>(null);

    function init(canvas: HTMLCanvasElement) {
      game.value = new TwentyFortyEight(canvas);
    }

    function start(config?: Partial<IGameConfig>) {
      if (!game.value) return;

      if (config) {
        selectedConfig.value = { ...gameConfig, ...config };
        game.value.updateConfig(config);
      }

      game.value.start();
    }

    function restart() {
      if (!game.value) return;

      game.value.restart();
    }

    function setCurrentGameId(currentId: string) {
      current.value = currentId;
    }

    function updateStatus(newStatus: GameStatus) {
      status.value = newStatus;
    }

    function setScore(scoreAddition: number, id: string, isCustom: boolean = false) {
      if (!userStore.user) return;

      currentScore.value += scoreAddition;
      maximalNumber.value = Math.max(maximalNumber.value, scoreAddition);

      if (isCustom) return;

      const existedScore = scores.value.find((score) => score.id === id);

      if (existedScore) {
        existedScore.score = currentScore.value;
        existedScore.date = new Date().toISOString();
        existedScore.playerName = userStore.user.name;
      } else {
        scores.value.push({
          id: id || uuidv4(),
          score: currentScore.value,
          playerName: userStore.user.name,
          date: new Date().toISOString(),
        });
      }

      reduceScores();
    }

    function clearScore() {
      currentScore.value = 0;
    }

    function reduceScores() {
      scores.value.sort((a, b) => b.score - a.score);
      scores.value = scores.value.slice(0, 10);
    }

    return {
      scores,
      current,
      currentScore,
      status,
      selectedConfig,
      maximalNumber,
      init,
      start,
      restart,
      updateStatus,
      setCurrentGameId,
      setScore,
      clearScore,
      reduceScores,
    };
  },
  {
    persist: {
      paths: ["scores"],
    },
  },
);
