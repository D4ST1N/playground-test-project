<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createTetrisGame, TetrisGame } from '../Game/TetrisGame';
import Field from '@/components/Games/Tetris/UI/Field.vue';
import NextFigurePanel from '@/components/Games/Tetris/UI/NextFigurePanel.vue';
import ScorePanel from '@/components/Games/Tetris/UI/ScorePanel.vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const nextFigureCanvasRef = ref<HTMLCanvasElement | null>(null);
const scorePanelCanvasRef = ref<HTMLCanvasElement | null>(null);
const gameStarted = ref<boolean>(false);
let Game: TetrisGame | null = null;

onMounted(() => {
  if (!canvasRef.value || !nextFigureCanvasRef.value || !scorePanelCanvasRef.value) {
    return;
  }

  Game = createTetrisGame({ canvas: canvasRef.value, nextFigureCanvas: nextFigureCanvasRef.value, scorePanelCanvas: scorePanelCanvasRef.value });
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
    <ScorePanel v-show="gameStarted">
      <canvas ref="scorePanelCanvasRef" width="200" height="160" />
    </ScorePanel>
    <Field>
      <v-btn v-if="!gameStarted" @click="startGame">Start</v-btn>
      <canvas v-show="gameStarted" ref="canvasRef" width="400" height="800" />
    </Field>
    <NextFigurePanel v-show="gameStarted">
      <canvas ref="nextFigureCanvasRef" width="160" height="160" />
    </NextFigurePanel>
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
</style>
