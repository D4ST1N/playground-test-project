<script setup lang="ts">
import { useMinesweeperStore } from "@/store/games/minesweeper";
import { GameStatus } from "@/helpers/generalTypes";

const store = useMinesweeperStore();

function endGame() {
  store.endGame();
}
</script>

<template>
  <div>
    <div v-if="store.status === GameStatus.Victory" :class="$style.alertContainer">
      <div :class="$style.alertWrapper">
        <v-alert type="success" title="You Won!">
          <v-btn @click="endGame">Start a New Game</v-btn>
        </v-alert>
      </div>
    </div>
    <div v-if="store.status === GameStatus.Defeat" :class="$style.alertContainer">
      <div :class="$style.alertWrapper">
        <v-alert type="error" title="Defeated!">
          <v-btn @click="endGame">Start a New Game</v-btn>
        </v-alert>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.alertContainer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.67);
  display: flex;
  align-items: center;
  justify-content: center;
}

.alertWrapper {
  width: 300px;
}
</style>
