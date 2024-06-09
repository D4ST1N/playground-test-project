<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { GameStatus } from "@/helpers/generalTypes";
import { useSudokuStore } from "@/store/games/sudoku";

const sudokuStore = useSudokuStore();
const { status } = storeToRefs(sudokuStore);

const gameStarted = computed(() => status.value !== GameStatus.NotStarted);

function solve() {
  sudokuStore.solve();
}

function restart() {
  sudokuStore.restart();
}

function startNew() {
  sudokuStore.startNew();
}
</script>

<template>
  <v-btn v-if="gameStarted" variant="outlined" @click="solve">
    <template v-slot:prepend>
      <v-icon>mdi-check</v-icon>
    </template>
    Solve
  </v-btn>
  <v-btn v-if="gameStarted" variant="outlined" @click="restart">
    <template v-slot:prepend>
      <v-icon>mdi-restart</v-icon>
    </template>
    Restart
  </v-btn>
  <v-btn v-if="gameStarted" variant="outlined" @click="startNew">
    <template v-slot:prepend>
      <v-icon>mdi-window-close</v-icon>
    </template>
    Start New Game
  </v-btn>
</template>
