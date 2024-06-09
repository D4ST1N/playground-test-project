<script setup lang="ts">
import { GameDifficulty } from "@/helpers/games/sudoku/types";
import { useSudokuStore } from "@/store/games/sudoku";
import StyledTitle from "@/components/UI/StyledTitle.vue";

const props = defineProps({
  disabled: Boolean,
});
const sudokuStore = useSudokuStore();

function startGame(difficulty: GameDifficulty) {
  sudokuStore.startNewGame(difficulty);
}
</script>

<template>
  <div :class="$style.buttons">
    <StyledTitle> Choose game field size </StyledTitle>
    <v-btn
      :disabled="props.disabled"
      variant="outlined"
      @click="() => startGame(GameDifficulty.Easy)"
    >
      <template v-slot:prepend>
        <v-icon size="x-small">mdi-fire</v-icon>
      </template>
      Easy
    </v-btn>
    <v-btn
      :disabled="props.disabled"
      variant="outlined"
      @click="() => startGame(GameDifficulty.Medium)"
    >
      <template v-slot:prepend>
        <v-icon size="small">mdi-fire</v-icon>
      </template>
      Medium
    </v-btn>
    <v-btn
      :disabled="props.disabled"
      variant="outlined"
      @click="() => startGame(GameDifficulty.Hard)"
    >
      <template v-slot:prepend>
        <v-icon size="medium">mdi-fire</v-icon>
      </template>
      Hard
    </v-btn>
    <v-btn
      :disabled="props.disabled"
      variant="outlined"
      @click="() => startGame(GameDifficulty.Expert)"
    >
      <template v-slot:prepend>
        <v-icon size="x-large">mdi-fire</v-icon>
      </template>
      Expert
    </v-btn>
  </div>
</template>

<style lang="scss" module>
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
