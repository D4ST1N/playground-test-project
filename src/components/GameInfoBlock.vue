<script setup lang="ts">
import { GameInfo } from '@/helpers/generalTypes';
import router from '@/router';

const props = defineProps<{
  gameInfo: GameInfo;
}>();

function openGame() {
  router.push({ name: props.gameInfo.path })
}
</script>

<template>
  <div :class="$style.gameInfo" @click="openGame">
    <h3 :class="$style.gameName">{{ props.gameInfo.name }}</h3>
    <div :class="$style.gameDescription">{{ props.gameInfo.description }}</div>
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

.gameDescription {
  color: #fff;
}
</style>