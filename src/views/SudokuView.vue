<script setup lang="ts">
import { onBeforeRouteLeave } from "vue-router";
import { storeToRefs } from "pinia";
import { GameStatus } from "@/helpers/generalTypes";
import PageLayout from "@/components/UI/PageLayout.vue";
import Scene from "@/components/Games/Sudoku/UI/Scene.vue";
import SudokuRules from "@/components/Games/Sudoku/UI/SudokuRules.vue";
import SudokuControlInformation from "@/components/Games/Sudoku/UI/SudokuControlInformation.vue";
import HighScore from "@/components/Games/Sudoku/UI/HighScore.vue";
import GameTime from "@/components/Games/Sudoku/UI/GameTime.vue";
import { useSudokuStore } from "@/store/games/sudoku";
import DigitsInformation from "@/components/Games/Sudoku/UI/DigitsInformation.vue";
import GameActions from "@/components/UI/GameActions.vue";
import SudokuGameActions from "@/components/Games/Sudoku/UI/GameActions.vue";
import MusicToggleButton from "@/components/UI/MusicToggleButton.vue";
import NewGameStart from "@/components/UI/NewGameStart.vue";
import StartButtons from "@/components/Games/Sudoku/UI/StartButtons.vue";
import GameNotifications from "@/components/UI/GameNotifications.vue";
import GameProgress from "@/components/UI/GameProgress.vue";
import LivesCount from "@/components/UI/LivesCount.vue";

const sudokuStore = useSudokuStore();
const { status, musicIsPlaying, emptyCellsCount, totalEmptyCellsCount, livesCount } =
  storeToRefs(sudokuStore);

onBeforeRouteLeave((_to, _from, next) => {
  sudokuStore.stopMusic();
  next();
});
</script>

<template>
  <PageLayout>
    <template #panel>
      <SudokuControlInformation />
      <HighScore v-if="status !== GameStatus.NotStarted" />
    </template>
    <template v-if="status !== GameStatus.NotStarted" #header>
      <GameTime />
      <DigitsInformation />
    </template>
    <template v-if="status !== GameStatus.NotStarted" #top>
      <GameProgress
        :current="totalEmptyCellsCount - emptyCellsCount"
        :total="totalEmptyCellsCount"
        :max-level="emptyCellsCount === 0"
      />
      <LivesCount :lives-count="livesCount" />
    </template>
    <GameNotifications :status="status" />
    <Scene />
    <NewGameStart v-show="status === GameStatus.NotStarted">
      <template #buttons="{ buttonDisable }">
        <StartButtons :disabled="buttonDisable" />
      </template>
    </NewGameStart>
    <GameActions>
      <template #actions>
        <SudokuGameActions />
      </template>
    </GameActions>
    <template #information>
      <SudokuRules />
    </template>
    <template v-if="status !== GameStatus.NotStarted" #actions>
      <MusicToggleButton :music-is-on="musicIsPlaying" @toggle-music="sudokuStore.toggleMusic" />
    </template>
  </PageLayout>
</template>
