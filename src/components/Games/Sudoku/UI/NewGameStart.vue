<script setup lang="ts">
import { GameDifficulty } from "@/helpers/games/sudoku/types";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const emit = defineEmits(["start-game"]);

const { user } = storeToRefs(userStore);

function startGame(difficulty: GameDifficulty) {
  emit("start-game", difficulty);
}
</script>

<template>
  <div :class="$style.buttons">
    <v-alert
      v-if="!user"
      type="info"
      title="You need to be authorized to play games"
      class="elevation-4 mt-4"
    ></v-alert>
    <h2>Choose game difficulty:</h2>
    <v-btn :disabled="!user" color="success" @click="() => startGame(GameDifficulty.Easy)">
      Easy
    </v-btn>
    <v-btn :disabled="!user" color="warning" @click="() => startGame(GameDifficulty.Medium)">
      Medium
    </v-btn>
    <v-btn :disabled="!user" color="error" @click="() => startGame(GameDifficulty.Hard)">
      Hard
    </v-btn>
  </div>
</template>

<style lang="scss" module>
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
