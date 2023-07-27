<script setup lang="ts">
import { computed, ref, watch, StyleValue, VNode } from "vue";
import { config } from "@/helpers/games/sudoku/gameConfig";
import { getAllowedNumbers, getCellAreaCells } from "@/helpers/games/sudoku/helpers";
import { HTMLElementWithVNode, SudokuArea } from "@/helpers/games/sudoku/types";
import { GameStatus } from "@/helpers/generalTypes";
import { useSudokuStore } from "@/store/games/sudoku";

const props = defineProps<{
  value: number | null;
  isInitial: boolean;
  cellIndex: number;
  currentIndex: number | null;
  highlightedNumber: number | null;
  highlighted: boolean;
  withError: boolean;
  cellArea: SudokuArea;
}>();
const emit = defineEmits(["focus"]);
const sudokuStore = useSudokuStore();
const informativeNumbers = ref<number[]>([]);
const showInfo = ref<boolean>(false);
const buttonPressed = ref<boolean>(false);

const timeoutId = ref<number | null>(null);

const cellStyles = {
  width: `${config.cellSize}px`,
  height: `${config.cellSize}px`,
  borderLeft: props.cellIndex % 3 === 0 ? "3px solid #fffc" : "1px solid #fff4",
  borderRight: (props.cellIndex + 1) % 9 === 0 ? "3px solid #fffc" : "none",
  borderTop: ((props.cellIndex / 9) | 0) % 3 === 0 ? "3px solid #fffc" : "1px solid #fff4",
  borderBottom: ((props.cellIndex / 9) | 0) === 8 ? "3px solid #fffc" : "none",
};

const { left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight } = getCellAreaCells(
  props.cellIndex,
);
const withTop = top && props.cellArea.cells.includes(top);
const withBottom = bottom && props.cellArea.cells.includes(bottom);
const withLeft = left && props.cellArea.cells.includes(left);
const withRight = right && props.cellArea.cells.includes(right);
const topLeftCorner = !!(
  left &&
  top &&
  props.cellArea.cells.includes(left) &&
  props.cellArea.cells.includes(top) &&
  (topLeft === null || !props.cellArea.cells.includes(topLeft))
);
const topRightCorner = !!(
  right &&
  top &&
  props.cellArea.cells.includes(right) &&
  props.cellArea.cells.includes(top) &&
  (topRight === null || !props.cellArea.cells.includes(topRight))
);
const bottomLeftCorner = !!(
  left &&
  bottom &&
  props.cellArea.cells.includes(left) &&
  props.cellArea.cells.includes(bottom) &&
  (bottomLeft === null || !props.cellArea.cells.includes(bottomLeft))
);
const bottomRightCorner = !!(
  right &&
  bottom &&
  props.cellArea.cells.includes(right) &&
  props.cellArea.cells.includes(bottom) &&
  (bottomRight === null || !props.cellArea.cells.includes(bottomRight))
);
const isTopOfTheArea = props.cellIndex === Math.min(...props.cellArea.cells);

const isCurrent = computed(() => {
  return props.currentIndex === props.cellIndex;
});

const availableNumbers = computed(() => {
  return getAllowedNumbers(sudokuStore.gameField, props.cellIndex);
});

const isAreaHighlighted = computed(() => {
  return props.currentIndex !== null && props.cellArea.cells.includes(props.currentIndex);
});

watch(isCurrent, (newValue: boolean) => {
  if (!newValue) {
    showInfo.value = false;
  }
});

watch(
  () => props.value,
  (newValue: number | null) => {
    if (newValue && !props.withError) {
      informativeNumbers.value = [];
      showInfo.value = false;
    }
  },
);

// clear not allowed numbers when cell is filled
sudokuStore.$onAction(({ name, args: [_, value], after }) => {
  if (name === "setCell" && value !== 0) {
    after(() => {
      informativeNumbers.value = informativeNumbers.value.filter((num) =>
        availableNumbers.value.includes(num),
      );
    });
  }
});

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  let value = target.value;

  if (sudokuStore.status !== GameStatus.Playing) {
    e.preventDefault();
    target.value = "";
    return;
  }

  if (Number.isNaN(parseInt(value))) {
    e.preventDefault();
    target.value = "";
    sudokuStore.setCell(props.cellIndex, 0);
    return;
  }

  if (value.length > 1) {
    e.preventDefault();
    value = value.slice(-1);
    target.value = value;
  }

  sudokuStore.setCell(props.cellIndex, Number(value));
}

function onFocus() {
  emit("focus", props.cellIndex);
}

function addInfo(value: number) {
  if (informativeNumbers.value.includes(value)) {
    informativeNumbers.value = informativeNumbers.value.filter((num) => num !== value);
  } else {
    informativeNumbers.value.push(value);
  }
}

function addAllInfo() {
  informativeNumbers.value = availableNumbers.value;
  showInfo.value = false;
}

function toggleInfoVisibility() {
  showInfo.value = !showInfo.value;
}

function isShowedInfoNumber(number: number) {
  return informativeNumbers.value.includes(number);
}

function informativeNumberStyles(number: number) {
  const isHighlighted = props.highlightedNumber && number === props.highlightedNumber;
  return {
    gridArea: `i${number}`,
    color: isHighlighted ? "#1a46d7e6" : "#ffffffe6",
    fontWeight: isHighlighted ? "bold" : "normal",
  };
}

function calculateAreaStyles(): StyleValue {
  const areaStyles: StyleValue = {};

  if (props.cellArea.cells.includes(props.cellIndex - 1) && props.cellIndex % 9 !== 0) {
    areaStyles.borderLeft = "none";
  }

  if (props.cellArea.cells.includes(props.cellIndex + 1) && (props.cellIndex + 1) % 9 !== 0) {
    areaStyles.borderRight = "none";
  }

  if (props.cellArea.cells.includes(props.cellIndex - 9) && props.cellIndex > 8) {
    areaStyles.borderTop = "none";
  }

  if (props.cellArea.cells.includes(props.cellIndex + 9) && props.cellIndex < 72) {
    areaStyles.borderBottom = "none";
  }

  return areaStyles;
}

function getRotation(number: number, reverse: boolean = false) {
  return `${(27 * number - 45) * (reverse ? -1 : 1)}deg`;
}

function onMouseDown() {
  buttonPressed.value = true;

  timeoutId.value = window.setTimeout(() => {
    toggleInfoVisibility();
  }, 250);

  window.addEventListener("mouseup", onMouseUp);
}

function onMouseUp(e: MouseEvent) {
  window.removeEventListener("mouseup", onMouseUp);

  buttonPressed.value = false;

  if (timeoutId.value) {
    window.clearTimeout(timeoutId.value);
  }

  showInfo.value = false;
  const target: HTMLElementWithVNode = e.target as HTMLElementWithVNode;

  if (!target) return;

  const vNode: VNode = target.__vnode;

  if (vNode.props && vNode.props.onClick) {
    vNode.props.onClick(e);
  }
}
</script>

<template>
  <div
    :class="{
      [$style.cell]: true,
      [$style.highlighted]: highlighted,
      [$style.highlightedNumber]: highlightedNumber && props.value === highlightedNumber,
      [$style.withError]: props.withError,
      [$style.cellDisabled]: props.isInitial || (props.value !== 0 && !props.withError),
      [$style.initial]: props.isInitial,
    }"
    :style="cellStyles"
    @click="onFocus"
    @mousedown="onMouseDown"
  >
    <input
      type="text"
      :disabled="props.isInitial"
      :value="props.value ? props.value : ''"
      :class="$style.cellValue"
      @input="onInput"
      @focus="onFocus"
    />
    <div v-if="showInfo" :class="$style.infoNumberContainer">
      <div
        v-for="number in 9"
        :key="number"
        :style="{ rotate: getRotation(number) }"
        :class="$style.infoNumberWrapper"
      >
        <div
          class="elevation-2"
          :class="{
            [$style.infoNumber]: true,
            [$style.showed]: isShowedInfoNumber(number),
            [$style.disabled]: !availableNumbers.includes(number),
          }"
          :style="{ rotate: getRotation(number, true) }"
          @click="addInfo(number)"
        >
          {{ number }}
        </div>
      </div>
      <div :class="$style.infoNumberWrapper" :style="{ rotate: '225deg' }">
        <div
          :class="[$style.infoNumber, $style.addAll]"
          :style="{ rotate: '-225deg' }"
          @click="addAllInfo"
        >
          Add all
        </div>
      </div>
    </div>
    <div :class="$style.informativeNumber">
      <div v-for="number in 9" :key="number" :style="informativeNumberStyles(number)">
        {{ isShowedInfoNumber(number) ? number : "" }}
      </div>
    </div>
    <div
      :class="{
        [$style.area]: true,
        [$style.highlightedArea]: isAreaHighlighted,
      }"
    >
      <div
        :class="{
          [$style.areaRegion]: true,
          [$style.withTop]: withTop && !withBottom,
          [$style.withBottom]: withBottom && !withTop,
          [$style.withLeft]: withLeft && !withRight,
          [$style.withRight]: withRight && !withLeft,
          [$style.withHorizontal]: withLeft && withRight,
          [$style.withVertical]: withTop && withBottom,
        }"
        :style="calculateAreaStyles()"
      ></div>
      <div v-if="topLeftCorner" :class="[$style.areaRegion, $style.topLeftCorner]"></div>
      <div v-if="topRightCorner" :class="[$style.areaRegion, $style.topRightCorner]"></div>
      <div v-if="bottomLeftCorner" :class="[$style.areaRegion, $style.bottomLeftCorner]"></div>
      <div v-if="bottomRightCorner" :class="[$style.areaRegion, $style.bottomRightCorner]"></div>
      <div v-if="isTopOfTheArea" :class="$style.areaSum">{{ props.cellArea.sum }}</div>
    </div>
  </div>
</template>

<style lang="scss" module>
.cell {
  border: 1px solid #fff5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  position: relative;
}

.initial {
  font-weight: bold;

  input {
    opacity: 1;
  }
}

.cellDisabled {
  cursor: pointer;

  input {
    pointer-events: none;
  }
}

.highlighted {
  background-color: rgb(228 214 187 / 15%);
}

.highlightedNumber {
  input {
    color: #cb952f;
  }
}

.withError {
  font-weight: 300;
  input {
    color: #db4242;
  }
}

.cellValue {
  font-size: 40px;
  max-width: 100%;
  height: 100%;
  text-align: center;
  opacity: 0.75;
  color: var(--main-secondary-color);
  cursor: pointer;

  &:focus {
    outline: none;
    background: radial-gradient(
      circle,
      rgba(210, 182, 129, 0) 0%,
      rgba(210, 182, 129, 0) 50%,
      rgba(210, 182, 129, 0.6) 100%
    );
  }
}

.infoNumberContainer {
  position: absolute;
  width: 100%;
  height: 50%;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  pointer-events: none;
  z-index: 1;
}

.infoNumberWrapper {
  position: absolute;
  width: 140%;
  height: 100%;
  top: 25%;
  left: -20%;
  transform-origin: 50% 50%;
}

.infoNumber {
  width: 24px;
  height: 24px;
  border: 1px solid var(--main-primary-color);
  display: flex;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  color: var(--main-secondary-color);
  border-radius: 50%;
  background-color: var(--main-darkest-color);
  pointer-events: all;
  cursor: pointer;
  position: absolute;
  bottom: -12px;
  left: -12px;
  transform-origin: 50% 50%;
  transition: scale 0.2s ease-in-out;

  &:hover {
    scale: 1.4;
  }
}

.addAll {
  width: auto;
  height: 18px;
  font-size: 14px;
  left: -30px;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 9px;

  &:hover {
    scale: 1.2;
  }
}

.showed {
  background-color: var(--main-secondary-color);
  color: var(--main-darkest-color);
}

.disabled {
  pointer-events: none;
  opacity: 0;
}

.informativeNumber {
  position: absolute;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  top: 6px;
  left: 6px;
  pointer-events: none;
  font-size: 12px;
  color: #ffffffe6;
  display: grid;
  grid-template-columns: 13px 13px 13px 13px 13px;
  grid-template-rows: 13px 13px 13px 13px 13px;
  grid-template-areas:
    "i1 . . . ."
    "i2 . . . ."
    "i3 . . . ."
    "i4 . . . ."
    "i5 i6 i7 i8 i9";
}

.area {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
}

.highlightedArea {
  background-color: rgb(210 182 129 / 25%);
}

.areaSum {
  position: absolute;
  color: var(--main-primary-color);
  top: 8px;
  left: calc(50% - 8px);
  text-align: center;
  font-size: 10px;
  font-weight: 300;
  line-height: 1;
  width: 16px;
}

.areaRegion {
  position: absolute;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  top: 4px;
  left: 4px;
  border: 1px dashed #fffa;
}

.withTop {
  top: auto;
  bottom: 4px;
  height: 100%;
}

.withLeft {
  left: auto;
  right: 4px;
  width: 100%;
}

.withRight {
  right: auto;
  left: 4px;
  width: 100%;
}

.withBottom {
  bottom: auto;
  top: 4px;
  height: 100%;
}

.withHorizontal {
  left: 0;
  right: 0;
  width: 100%;
}

.withVertical {
  top: 0;
  bottom: 0;
  height: 100%;
}

.topLeftCorner {
  right: calc(100% - 5px);
  bottom: calc(100% - 5px);
  top: auto;
  left: auto;
}

.topRightCorner {
  left: calc(100% - 5px);
  bottom: calc(100% - 5px);
  top: auto;
  right: auto;
}

.bottomLeftCorner {
  right: calc(100% - 5px);
  top: calc(100% - 5px);
  bottom: auto;
  left: auto;
}

.bottomRightCorner {
  left: calc(100% - 5px);
  top: calc(100% - 5px);
  bottom: auto;
  right: auto;
}
</style>
