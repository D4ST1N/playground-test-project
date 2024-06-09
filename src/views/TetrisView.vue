<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useTetrisStore } from "@/store/games/tetris";
import { GameStatus } from "@/helpers/generalTypes";
import { config } from "@/helpers/games/tetris/gameConfig";
import PageLayout from "@/components/UI/PageLayout.vue";
import Scene from "@/components/Games/Tetris/UI/Scene.vue";
import TetrisControlInformation from "@/components/Games/Tetris/UI/TetrisControlInformation.vue";
import TetrisRules from "@/components/Games/Tetris/UI/TetrisRules.vue";
import HighScore from "@/components/Games/Tetris/UI/HighScore.vue";
import GameProgress from "@/components/UI/GameProgress.vue";
import FiguresInformation from "@/components/Games/Tetris/UI/FiguresInformation.vue";
import GameScore from "@/components/UI/GameScore.vue";
import MusicToggleButton from "@/components/UI/MusicToggleButton.vue";
import NewGameStart from "@/components/UI/NewGameStart.vue";
import GameNotifications from "@/components/UI/GameNotifications.vue";

const tetrisStore = useTetrisStore();
const { gameLevel, status, clearedRows, score, musicStopped } = storeToRefs(tetrisStore);

const totalToNextLevel = computed(() => {
  const currentLevel = gameLevel.value;
  const nextLevel = currentLevel + 1;

  if (nextLevel > config.maxLevel) {
    return config.gameLevelRows[String(currentLevel)];
  }

  return config.gameLevelRows[String(nextLevel)] - config.gameLevelRows[String(currentLevel)];
});

const currentRows = computed(() => {
  const currentLevel = gameLevel.value;

  if (currentLevel === config.maxLevel) {
    return clearedRows.value;
  }

  return clearedRows.value - config.gameLevelRows[String(currentLevel)];
});

onBeforeRouteLeave((_to, _from, next) => {
  tetrisStore.stopMusic();
  next();
});

function toggleMusic() {
  if (musicStopped.value) {
    tetrisStore.startMusic();
  } else {
    tetrisStore.stopMusic();
  }
}

function startGame() {
  tetrisStore.startGame();
}
</script>

<template>
  <PageLayout>
    <template #panel>
      <TetrisControlInformation />
      <HighScore />
    </template>
    <template v-if="status !== GameStatus.NotStarted" #top>
      <GameProgress
        :current="currentRows"
        :total="totalToNextLevel"
        :level="gameLevel"
        :max-level="gameLevel === config.maxLevel"
      />
    </template>
    <GameNotifications :status="status" />
    <Scene v-show="status !== GameStatus.NotStarted" />
    <NewGameStart v-show="status === GameStatus.NotStarted">
      <template #buttons="{ buttonDisable }">
        <v-btn
          :disabled="buttonDisable"
          color="primary"
          :class="$style.button"
          @click="startGame"
        >
          Start
        </v-btn>
      </template>
    </NewGameStart>
    <template v-if="status !== GameStatus.NotStarted" #header>
      <GameScore :current-score="score" />
      <FiguresInformation />
    </template>
    <template #information>
      <TetrisRules />
    </template>
    <template v-if="status !== GameStatus.NotStarted" #actions>
      <MusicToggleButton :music-is-on="!musicStopped" @toggle-music="toggleMusic" />
    </template>
  </PageLayout>
</template>

<style lang="scss" module>
.button {
  color: var(--main-darker-color);
}
</style>
