<script setup lang="ts">
import { GameStatus } from "@/helpers/generalTypes";
import { useTwentyFortyEightStore } from "@/store/games/twentyFortyEight";

const store = useTwentyFortyEightStore();
const emit = defineEmits(["start-new-game", "continue-playing"]);

function startNew() {
  emit("start-new-game");
}

function continuePlaying() {
  emit("continue-playing");
}
</script>

<template>
  <div>
    <div v-if="store.status === GameStatus.Victory" :class="$style.alertContainer">
      <div :class="$style.alertWrapper">
        <v-alert
          type="success"
          title="You Won!"
          text="Do you want to continue playing or start a new game?"
          width="500"
        >
          <div :class="$style.alertActionsWrapper">
            <v-btn color="info" @click="startNew">Start a New Game</v-btn>
            <v-btn color="warning" @click="continuePlaying">Continue playing</v-btn>
          </div>
        </v-alert>
      </div>
    </div>
    <div v-if="store.status === GameStatus.Defeat" :class="$style.alertContainer">
      <div :class="$style.alertWrapper">
        <v-alert type="error" title="Defeated!" text="No more moves 😢">
          <div :class="$style.alertActionsWrapper">
            <v-btn color="info" @click="startNew">Start a New Game</v-btn>
          </div>
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
  padding-top: 250px;
  justify-content: center;
}

.alertWrapper {
  width: 300px;
}

.alertActionsWrapper {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
