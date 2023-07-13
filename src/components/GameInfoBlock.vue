<script setup lang="ts">
import { GameInfo } from "@/helpers/generalTypes";
import router from "@/router";

const props = defineProps<{
  gameInfo: GameInfo;
}>();

function openGame() {
  router.push(`/${props.gameInfo.path}`);
}
</script>

<template>
  <div :class="$style.gameInfo">
    <h3 :class="$style.gameName">{{ props.gameInfo.name }}</h3>
    <div :class="$style.gameContent">
      <div :class="$style.gameDescription">{{ props.gameInfo.description }}</div>
      <v-btn :disabled="!props.gameInfo.implemented" color="primary" @click="openGame">Play</v-btn>
    </div>
  </div>
</template>

<style lang="scss" module>
.gameInfo {
  width: 260px;
  padding: 12px 16px;
  background-color: rgba(38, 50, 56, 0.8);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}

.gameName {
  color: #fff;
  margin-bottom: 16px;
}

.gameContent {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-grow: 1;
}

.gameDescription {
  color: #fff;
}
</style>
