<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useSudokuStore } from "@/store/games/sudoku";
import HighScore from "@/components/Games/Sudoku/UI/HighScore.vue";

const gameStore = useSudokuStore();
const { time } = storeToRefs(gameStore);

function solvePuzzle() {
  gameStore.solve();
}

function restart() {
  gameStore.restart();
}

function startNew() {
  gameStore.startNew();
}
</script>

<template>
  <div :class="$style.panelWrapper">
    <div :class="$style.timer">
      {{ time }}
      <v-icon icon="mdi-timer" :size="28" />
    </div>

    <div class="mb-1">Errors: {{ gameStore.errorsCount }}</div>

    <div :class="$style.actions">
      <v-btn color="teal-darken-1" @click="startNew"> Start New Game </v-btn>
      <v-btn color="warning" @click="restart"> Restart </v-btn>
      <v-btn color="success" @click="solvePuzzle">
        Solve
        <v-icon class="ml-2">mdi-alert-outline</v-icon>
        <v-tooltip activator="parent" location="top" theme="light">
          This will prevent from getting high score
        </v-tooltip>
      </v-btn>
    </div>

    <HighScore />
  </div>
</template>

<style lang="scss" module>
.panelWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: #efefef;
  width: 150px;
  gap: 12px;
}

.timer {
  font-size: 36px;
  min-width: 120px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  gap: 8px;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}
</style>
