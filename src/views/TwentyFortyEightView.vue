<script setup lang="ts">
import { storeToRefs } from "pinia";
import { GameStatus } from "@/helpers/generalTypes";
import PageLayout from "@/components/UI/PageLayout.vue";
import Scene from "@/components/Games/TwentyFortyEight/UI/Scene.vue";
import HighScore from "@/components/Games/TwentyFortyEight/UI/HighScore.vue";
import { useTwentyFortyEightStore } from "@/store/games/twentyFortyEight";
import GameScore from "@/components/UI/GameScore.vue";
import NewGameStart from "@/components/UI/NewGameStart.vue";
import StartButtons from "@/components/Games/TwentyFortyEight/UI/StartButtons.vue";
import GameNotifications from "@/components/UI/GameNotifications.vue";
import GameActions from "@/components/UI/GameActions.vue";
import TfeGameActions from "@/components/Games/TwentyFortyEight/UI/GameActions.vue";
import TwentyFortyEightControlInformation from "@/components/Games/TwentyFortyEight/UI/TwentyFortyEightControlInformation.vue";
import GameProgress from "@/components/UI/GameProgress.vue";
import TwentyFortyEightRules from "@/components/Games/TwentyFortyEight/UI/TwentyFortyEightRules.vue";
import { isCustomConfig } from "@/helpers/games/twentyFortyEight/helpers";
import { computed } from "vue";

const tfeStore = useTwentyFortyEightStore();
const { currentScore, status, selectedConfig, maximalNumber } = storeToRefs(tfeStore);

const isCustom = computed(() => isCustomConfig(selectedConfig.value));
</script>

<template>
  <PageLayout>
    <template #panel>
      <TwentyFortyEightControlInformation />
      <HighScore v-if="!isCustom" />
    </template>
    <template v-if="status !== GameStatus.NotStarted" #top>
      <GameProgress
        :current="maximalNumber"
        :total="selectedConfig.winValue"
        :max-level="maximalNumber >= selectedConfig.winValue"
      />
    </template>
    <Scene />
    <GameNotifications :status="status" />
    <NewGameStart v-show="status === GameStatus.NotStarted">
      <template #buttons="{ buttonDisable }">
        <StartButtons :disabled="buttonDisable" />
      </template>
    </NewGameStart>
    <GameActions>
      <template #actions>
        <TfeGameActions />
      </template>
    </GameActions>
    <template #information>
      <TwentyFortyEightRules />
    </template>
    <template v-if="status !== GameStatus.NotStarted" #header>
      <GameScore :current-score="currentScore" />
    </template>
  </PageLayout>
</template>
