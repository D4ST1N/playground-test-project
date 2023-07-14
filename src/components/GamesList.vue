<script setup lang="ts">
import { ref } from "vue";
import { games } from "@/helpers/staticData";
import { GameInfo } from "@/helpers/generalTypes";
import GameInfoBlock from "@/components/GameInfoBlock.vue";

const gamesList = ref<GameInfo[]>(games);
</script>

<template>
  <div :class="$style.gamesInfoContainer">
    <GameInfoBlock v-for="game in gamesList" :key="game.id" :gameInfo="game" />
  </div>
</template>

<style lang="scss" module>
.gamesInfoContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  padding: 16px 0;
}
</style>
