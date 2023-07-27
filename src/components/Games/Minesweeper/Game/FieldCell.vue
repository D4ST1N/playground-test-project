<script setup lang="ts">
import { useCssModule, computed, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { type FieldCell, FieldCellLabel } from "@/helpers/games/minesweeper/types";
import { useMinesweeperStore } from "@/store/games/minesweeper";

const props = defineProps<{
  fieldCell: FieldCell;
}>();
const emit = defineEmits(["left-click", "middle-click", "right-click"]);
const minesweeperStore = useMinesweeperStore();
const { selectedConfiguration } = storeToRefs(minesweeperStore);
const styles = useCssModule();
const hidden = ref<boolean>(true);
const cellRef = ref<HTMLButtonElement | null>(null);

const minesNumberColorMapping: { [index: number]: string } = {
  0: "#fff",
  1: "#27a15c",
  2: "#27a18f",
  3: "#277ba1",
  4: "#2754a1",
  5: "#4927a1",
  6: "#9227a1",
  7: "#a12772",
  8: "#a12728",
};
const maxDelay = selectedConfiguration.value.width * selectedConfiguration.value.height;
const delay = (maxDelay - props.fieldCell.coordinates.x * props.fieldCell.coordinates.y) * 2;

const cellClasses = computed(() => ({
  [styles.cell]: true,
  [styles.opened]: !props.fieldCell.isHidden,
  [styles.mine]: props.fieldCell.isPlanted,
  [styles.flag]: props.fieldCell.label === FieldCellLabel.Flag,
  [styles.question]: props.fieldCell.label === FieldCellLabel.Question,
  [styles.highlight]: props.fieldCell.isHighlighted,
  [styles.hidden]: hidden.value,
}));

const cellStyles = computed(() => ({
  color: minesNumberColorMapping[props.fieldCell.numberOfMinesNearby],
}));

onMounted(() => {
  cellRef.value?.addEventListener("animationend", () => {
    hidden.value = false;
  });
});

function handleLeftClick() {
  emit("left-click");
}

function handleMiddleClick() {
  emit("middle-click");
}

function handleRightClick() {
  emit("right-click");
}
</script>

<template>
  <button
    ref="cellRef"
    @click.prevent.left="handleLeftClick"
    @click.prevent.middle="handleMiddleClick"
    @click.prevent.right="handleRightClick"
    :class="cellClasses"
    :style="{
      animationDelay: `${delay}ms`,
    }"
  >
    <span v-if="fieldCell.label === FieldCellLabel.Flag"><v-icon icon="mdi-flag" /></span>
    <span v-else-if="fieldCell.label === FieldCellLabel.Question">
      <v-icon icon="mdi-help-circle-outline" />
    </span>
    <span v-else-if="fieldCell.isHidden"></span>
    <span v-else-if="!fieldCell.isHidden && fieldCell.isPlanted"><v-icon icon="mdi-mine" /></span>
    <span v-else :style="cellStyles">{{
      fieldCell.numberOfMinesNearby ? fieldCell.numberOfMinesNearby : ""
    }}</span>
  </button>
</template>

<style lang="scss" module>
.cell {
  width: 40px;
  height: 40px;
  background-color: #dfdfdf;
  border: 1px solid #ccc;
  color: #444;
  font-size: 20px;
  font-weight: bold;
  opacity: 1;
  animation: appear 0.4s ease;

  &:hover {
    background-color: #c9c9c9;
  }

  &:active {
    box-shadow: inset 0 0 12px 2px #ccc;
  }
}

.hidden {
  opacity: 0;
}

.opened {
  background-color: #efefef;
}

.mine {
  color: #b35049;
}

.flag {
  color: #507bdf;
}

.question {
  color: #56ba87;
}

.highlight {
  transition: all 0.175s ease;
  border: 1px solid #89b2ce;
  box-shadow: inset 0 0 12px 2px #89b2ce;
}

@keyframes appear {
  0% {
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  90% {
    transform: translate(5%, 5%);
    opacity: 0.75;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
