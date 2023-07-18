<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { TwentyFortyEight } from "@/components/Games/TwentyFortyEight/Game/TwentyFortyEight";
import NewGameStart from "@/components/Games/TwentyFortyEight/UI/NewGameStart.vue";
import { IGameConfig } from "@/helpers/games/twentyFortyEight/gameConfig";
import GameScore from "@/components/Games/TwentyFortyEight/UI/GameScore.vue";
import HighScore from "@/components/Games/TwentyFortyEight/UI/HighScore.vue";
import { useTwentyFortyEightStore } from "@/store/games/twentyFortyEight";
import { GameStatus } from "@/helpers/generalTypes";

const gameStore = useTwentyFortyEightStore();
const { status } = storeToRefs(gameStore);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const gameStarted = computed(() => status.value === GameStatus.Playing);

function startGame() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const game = new TwentyFortyEight(canvas);
  game.start();
}

function startCustomGame(config: Partial<IGameConfig>) {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const game = new TwentyFortyEight(canvas, config);
  game.start();
}
</script>

<template>
  <div :class="$style.gameWrapper">
    <div v-if="!gameStarted">
      <NewGameStart @start-game="startGame" @start-custom-game="startCustomGame" />
    </div>
    <div v-show="gameStarted" :class="$style.fieldWrapper">
      <GameScore />
      <canvas ref="canvasRef" width="500" height="500" />
      <HighScore />
    </div>
  </div>
</template>

<style lang="scss" module>
.gameWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
}

.fieldWrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
}
</style>
