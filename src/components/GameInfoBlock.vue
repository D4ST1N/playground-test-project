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

    <v-card-title :class="$style.gameName">
      {{ props.gameInfo.name }}
    </v-card-title>

    <v-card-actions>
      <v-btn
        :disabled="!props.gameInfo.implemented"
        @click="openGame"
      >
        Play
      </v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>

    <v-expand-transition>
      <div>
        <v-divider></v-divider>
        <v-card-text :class="$style.gameDescription">
          {{ props.gameInfo.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style lang="scss" module>
.gameName {
  color: var(--main-primary-color);
}

.gameDescription {
  color: var(--main-secondary-color);
}
</style>
