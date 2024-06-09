<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { GameStatus } from "@/helpers/generalTypes";
import { useMinesweeperStore } from "@/store/games/minesweeper";

const store = useMinesweeperStore();
const { status } = storeToRefs(store);

const gameEnded = computed(() => status.value === GameStatus.Victory || status.value === GameStatus.Defeat);

function startNew() {
  store.endGame();
}
</script>

<template>
  <v-btn v-if="gameEnded" variant="outlined" @click="startNew">
    <template #prepend>
      <v-icon>mdi-restart</v-icon>
    </template>
    Start New Game
  </v-btn>
</template>
