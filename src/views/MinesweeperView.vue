<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useMinesweeperStore } from "@/store/games/minesweeper";
import { GameStatus } from "@/helpers/generalTypes";
import PageLayout from "@/components/UI/PageLayout.vue";
import GameActions from "@/components/UI/GameActions.vue";
import Scene from "@/components/Games/Minesweeper/UI/Scene.vue";
import MinesweeperControlInformation from "@/components/Games/Minesweeper/UI/MinesweeperControlInformation.vue";
import StartButtons from "@/components/Games/Minesweeper/UI/StartButtons.vue";
import NewGameStart from "@/components/UI/NewGameStart.vue";
import MinesweeperRules from "@/components/Games/Minesweeper/UI/MinesweeperRules.vue";
import MinesweeperGameActions from "@/components/Games/Minesweeper/UI/GameActions.vue";
import HighScorePanel from "@/components/Games/Minesweeper/UI/HighScorePanel.vue";
import InfoPanel from "@/components/Games/Minesweeper/UI/InfoPanel.vue";
import GameProgress from "@/components/UI/GameProgress.vue";
import GameNotifications from "@/components/UI/GameNotifications.vue";

const minesweeperStore = useMinesweeperStore();
const { status, selectedConfiguration } = storeToRefs(minesweeperStore);

const totalCells = computed(() => {
  return (
    selectedConfiguration.value.width * selectedConfiguration.value.height -
    selectedConfiguration.value.numberOfMines
  );
});

const cellsLeft = computed(() => {
  return (
    totalCells.value -
    (minesweeperStore.hiddenCellsCount - selectedConfiguration.value.numberOfMines)
  );
});
</script>

<template>
  <PageLayout>
    <template #panel>
      <MinesweeperControlInformation />
      <HighScorePanel v-if="status !== GameStatus.NotStarted" />
    </template>
    <template v-if="status !== GameStatus.NotStarted" #top>
      <GameProgress :current="cellsLeft" :total="totalCells" />
    </template>
    <NewGameStart v-show="status === GameStatus.NotStarted">
      <template #buttons="{ buttonDisable }">
        <StartButtons :disabled="buttonDisable" />
      </template>
    </NewGameStart>
    <GameNotifications :status="status" />
    <Scene />
    <GameActions>
      <template #actions>
        <MinesweeperGameActions />
      </template>
    </GameActions>
    <template #information>
      <MinesweeperRules />
    </template>
    <template v-if="status !== GameStatus.NotStarted" #header>
      <InfoPanel />
    </template>
  </PageLayout>
</template>
