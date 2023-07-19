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
import Confetti from "@/components/UI/Confetti.vue";
import Notifications from "@/components/Games/TwentyFortyEight/UI/Notifications.vue";

const gameStore = useTwentyFortyEightStore();
const { status } = storeToRefs(gameStore);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const gameStarted = computed(() => status.value !== GameStatus.NotStarted);
let game = null as null | TwentyFortyEight;

function startGame() {
  start(null);
}

function startCustomGame(config: Partial<IGameConfig>) {
  start(config);
}

function start(config: Partial<IGameConfig> | null) {
  const canvas = canvasRef.value;
  if (!canvas) return;

  if (!game) {
    game = new TwentyFortyEight(canvas, config || {});
  }
  game.start();
}

function restartGame() {
  game?.restart();
}

function continuePlaying() {
  gameStore.updateStatus(GameStatus.Playing);
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
  <Notifications @start-new-game="restartGame" @continue-playing="continuePlaying" />
  <Confetti v-if="gameStore.status === GameStatus.Victory" />
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
