<script setup lang="ts">
import { ref, type Component, shallowRef } from "vue";
import { useRouter } from "vue-router";

import Sudoku from "@/components/UI/Rules/Sudoku.vue";
import TwentyFortyEight from "@/components/UI/Rules/TwentyFortyEight.vue";
import Minesweeper from "@/components/UI/Rules/Minesweeper.vue";
import Tetris from "@/components/UI/Rules/Tetris.vue";

const showDialog = ref<boolean>(false);
const component = shallowRef<Component | null>(null);
const router = useRouter();
const currentRoute = router.currentRoute;

function openModal() {
  const gameName = currentRoute.value.name as string;

  switch (gameName) {
    case "sudoku":
      component.value = Sudoku;
      break;
    case "twenty-forty-eight":
      component.value = TwentyFortyEight;
      break;
    case "minesweeper":
      component.value = Minesweeper;
      break;
    case "tetris":
      component.value = Tetris;
      break;
    default:
      component.value = null;
      return;
  }

  showDialog.value = true;
}

function closeDialog() {
  showDialog.value = false;
}
</script>

<template>
  <div v-if="currentRoute.name && currentRoute.name !== 'home'">
    <v-btn color="success" @click="openModal">Read game rules</v-btn>
  </div>
  <v-dialog :model-value="showDialog" width="800" :persistent="true">
    <v-card>
      <v-card-title>Rules</v-card-title>
      <component :is="component" />
      <v-card-actions class="d-flex justify-end">
        <v-btn color="info" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
