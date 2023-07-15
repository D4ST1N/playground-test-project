<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createTetrisGame, TetrisGame } from "../Game/TetrisGame";
import Field from "@/components/Games/Tetris/UI/Field.vue";
import NextFigurePanel from "@/components/Games/Tetris/UI/NextFigurePanel.vue";
import ScorePanel from "@/components/Games/Tetris/UI/ScorePanel.vue";
import Description from "@/components/Games/Tetris/UI/Description.vue";
import HighScore from "@/components/Games/Tetris/UI/HighScore.vue";
import FiguresInformation from "./FiguresInformation.vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const nextFigureCanvasRef = ref<HTMLCanvasElement | null>(null);
const scorePanelCanvasRef = ref<HTMLCanvasElement | null>(null);
const gameStarted = ref<boolean>(false);
let Game: TetrisGame | null = null;

onMounted(() => {
  if (!canvasRef.value || !nextFigureCanvasRef.value || !scorePanelCanvasRef.value) {
    return;
  }

  Game = createTetrisGame({
    canvas: canvasRef.value,
    nextFigureCanvas: nextFigureCanvasRef.value,
    scorePanelCanvas: scorePanelCanvasRef.value,
  });
});

function startGame() {
  if (!Game) {
    return;
  }

  gameStarted.value = true;
  Game.start();
}
</script>

<template>
  <div :class="$style.scene">
    <div v-show="gameStarted" :class="[$style.panel, $style.leftPanel]">
      <ScorePanel>
        <canvas ref="scorePanelCanvasRef" width="500" height="80" />
      </ScorePanel>
      <HighScore />
    </div>
    <Field>
      <div v-if="!gameStarted" class="d-flex flex-column align-center">
        <v-btn :disabled="!user" @click="startGame">Start</v-btn>
        <v-alert
          v-if="!user"
          type="info"
          title="You need to be authorized to play games"
          class="elevation-4 mt-4"
        ></v-alert>
      </div>
      <canvas v-show="gameStarted" ref="canvasRef" width="450" height="900" />
    </Field>
    <div v-show="gameStarted" :class="$style.panel">
      <NextFigurePanel>
        <canvas ref="nextFigureCanvasRef" width="160" height="160" />
      </NextFigurePanel>
      <Description />
      <FiguresInformation />
    </div>
  </div>
</template>

<style lang="scss" module>
.scene {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
}

.panel {
  display: flex;
  flex-direction: column;
  width: 500px;
}

.leftPanel {
  align-items: flex-end;
}
</style>
