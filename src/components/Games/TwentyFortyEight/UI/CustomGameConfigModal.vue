<script setup lang="ts">
import { computed, ref } from "vue";
import { IGameConfig } from "@/helpers/games/twentyFortyEight/gameConfig";
import {
  sizeOptions,
  startTilesOptions,
  fourSpawnChanceOptions,
  tileSizeOptions,
  tileGapOptions,
  tileRoundSizeOptions,
} from "@/helpers/games/twentyFortyEight/entities";
import StyledTitle from "@/components/UI/StyledTitle.vue";

const props = defineProps<{
  showModal: boolean;
}>();
const emit = defineEmits(["close-dialog", "submit-dialog"]);

const gameConfiguration = ref<Partial<IGameConfig>>({
  fieldSize: 4,
  startTiles: 2,
  fourSpawnChance: 0.1,
  tileSize: 100,
  tileGap: 20,
  tileRoundSize: 5,
});

const previewWrapperStyles = computed(() => {
  const { tileSize, tileGap } = gameConfiguration.value;

  const size = tileSize! + tileGap! * 2;

  return {
    width: `${size}px`,
    height: `${size}px`,
    padding: `${tileGap}px`,
  };
});

const previewStyles = computed(() => {
  const { tileSize, tileRoundSize } = gameConfiguration.value;

  return {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    "border-radius": `${tileRoundSize}px`,
  };
});

function closeDialog() {
  emit("close-dialog");
}

function submitDialog() {
  emit("submit-dialog", gameConfiguration.value);
}
</script>

<template>
  <v-dialog :model-value="props.showModal" width="800" :persistent="true">
    <v-card color="var(--main-darkest-color)">
      <v-card-title class="pt-4">
        <StyledTitle>Custom game configuration</StyledTitle>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="gameConfiguration.fieldSize"
                :items="sizeOptions"
                density="comfortable"
                label="Field Size"
                color="primary"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="gameConfiguration.startTiles"
                :items="startTilesOptions"
                density="comfortable"
                label="Number of tiles filled at start"
                color="primary"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="gameConfiguration.fourSpawnChance"
                :items="fourSpawnChanceOptions"
                density="comfortable"
                label="Chance of spawning 4"
                color="primary"
                item-title="label"
                item-value="value"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <StyledTitle>Field view customization</StyledTitle>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="gameConfiguration.tileSize"
                :items="tileSizeOptions"
                label="Tile Size"
                color="primary"
              ></v-select>
              <v-select
                v-model="gameConfiguration.tileGap"
                :items="tileGapOptions"
                label="Gap between tiles"
                color="primary"
              ></v-select>
              <v-select
                v-model="gameConfiguration.tileRoundSize"
                :items="tileRoundSizeOptions"
                label="Tile rounded border radius"
                color="primary"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <div :class="$style.previewWrapper" :style="previewWrapperStyles">
                <div :class="$style.preview" :style="previewStyles"></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions :class="$style.buttons">
        <v-btn color="primary" variant="outlined" @click="closeDialog">
          Close
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :class="$style.button"
          @click="submitDialog"
        >
          Start
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" module>
.previewWrapper {
  background-color: #bbada0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview {
  background-color: #cdc1b4;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
}
.button {
  color: var(--main-darker-color);
}
</style>
