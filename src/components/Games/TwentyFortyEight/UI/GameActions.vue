<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { GameStatus } from "@/helpers/generalTypes";
import { useTwentyFortyEightStore } from "@/store/games/twentyFortyEight";

const tfeStore = useTwentyFortyEightStore();
const { status } = storeToRefs(tfeStore);

const gameEnded = computed(() => status.value === GameStatus.Defeat);
const gameWon = computed(() => status.value === GameStatus.Victory);
const gameStarted = computed(() => status.value !== GameStatus.NotStarted);

function continueGame() {
  tfeStore.updateStatus(GameStatus.Playing);
}

function startNewGame() {
  tfeStore.updateStatus(GameStatus.NotStarted);
}

function restart() {
  tfeStore.restart();
}
</script>

<template>
  <v-btn v-if="gameWon" variant="outlined" @click="continueGame">
    <template #prepend>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    Continue
  </v-btn>
  <v-btn
    v-if="gameEnded || gameWon"
    variant="outlined"
    @click="restart"
  >
    <template #prepend>
      <v-icon>mdi-restart</v-icon>
    </template>
    Restart
  </v-btn>
  <v-btn
    v-if="gameStarted"
    variant="outlined"
    @click="startNewGame"
  >
    <template #prepend>
      <v-icon>mdi-window-close</v-icon>
    </template>
    Start New Game
  </v-btn>
</template>
