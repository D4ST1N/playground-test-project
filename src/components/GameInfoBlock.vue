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
  <v-card class="" width="300">
    <v-img :src="props.gameInfo.cover" height="200px" cover></v-img>

    <v-card-title>
      {{ props.gameInfo.name }}
    </v-card-title>

    <v-card-actions>
      <v-btn :disabled="!props.gameInfo.implemented" color="primary" @click="openGame">Play</v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>

    <v-expand-transition>
      <div>
        <v-divider></v-divider>
        <v-card-text>
          {{ props.gameInfo.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
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
