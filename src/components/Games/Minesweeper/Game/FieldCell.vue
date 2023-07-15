<script setup lang="ts">
import { useCssModule, computed } from "vue";
import { type FieldCell, FieldCellLabel } from "@/helpers/games/minesweeper/types";

const props = defineProps<{
  fieldCell: FieldCell;
}>();
const emit = defineEmits(["left-click", "middle-click", "right-click"]);
const styles = useCssModule();

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

const cellClasses = computed(() => ({
  [styles.cell]: true,
  [styles.opened]: !props.fieldCell.isHidden,
  [styles.mine]: props.fieldCell.isPlanted,
  [styles.flag]: props.fieldCell.label === FieldCellLabel.Flag,
  [styles.question]: props.fieldCell.label === FieldCellLabel.Question,
  [styles.highlight]: props.fieldCell.isHighlighted,
}));

const cellStyles = computed(() => ({
  color: minesNumberColorMapping[props.fieldCell.numberOfMinesNearby],
}));

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
    @click.prevent.left="handleLeftClick"
    @click.prevent.middle="handleMiddleClick"
    @click.prevent.right="handleRightClick"
    :class="cellClasses"
  >
    <span v-if="fieldCell.label === FieldCellLabel.Flag"><v-icon icon="mdi-flag" /></span>
    <span v-else-if="fieldCell.label === FieldCellLabel.Question"
      ><v-icon icon="mdi-help-circle-outline"
    /></span>
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

  &:hover {
    background-color: #c9c9c9;
  }

  &:active {
    box-shadow: inset 0 0 12px 2px #ccc;
  }
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
</style>
