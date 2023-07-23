<script setup lang="ts">
import { config } from "@/helpers/games/sudoku/gameConfig";
import { getAllowedNumbers } from "@/helpers/games/sudoku/helpers";
import { useSudokuStore } from "@/store/games/sudoku";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  value: number | null;
  isInitial: boolean;
  cellIndex: number;
  isCurrent: boolean;
  highlightedNumber: number | null;
  highlighted: boolean;
  withError: boolean;
}>();
const emit = defineEmits(["focus"]);
const sudokuStore = useSudokuStore();
const informativeNumbers = ref<number[]>([]);
const showInfo = ref<boolean>(false);

const cellStyles = {
  width: `${config.cellSize}px`,
  height: `${config.cellSize}px`,
  borderLeft: props.cellIndex % 3 === 0 ? "2px solid #000" : "1px solid #000",
  borderRight: (props.cellIndex + 1) % 9 === 0 ? "2px solid #000" : "none",
  borderTop: ((props.cellIndex / 9) | 0) % 3 === 0 ? "2px solid #000" : "1px solid #000",
  borderBottom: ((props.cellIndex / 9) | 0) === 8 ? "2px solid #000" : "none",
};

watch(
  () => props.isCurrent,
  (newValue: boolean) => {
    if (!newValue) {
      showInfo.value = false;
    }
  },
);

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

const availableNumbers = computed(() => {
  return getAllowedNumbers(sudokuStore.gameField, props.cellIndex);
});

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  let value = target.value;

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
  >
    <input
      type="text"
      :disabled="props.isInitial"
      :value="props.value ? props.value : ''"
      :class="$style.cellValue"
      @input="onInput"
      @focus="onFocus"
    />
    <div
      v-if="props.isCurrent && props.value === 0"
      :class="$style.addInfo"
      @click="toggleInfoVisibility"
    >
      {{ showInfo ? "-" : "+" }}
    </div>
    <div v-if="showInfo" :class="$style.infoNumberContainer">
      <div
        v-for="number in 9"
        :key="number"
        class="elevation-2"
        :class="{
          [$style.infoNumber]: true,
          [$style.showed]: isShowedInfoNumber(number),
          [$style.disabled]: !availableNumbers.includes(number),
        }"
        @click="addInfo(number)"
      >
        {{ number }}
      </div>
      <div :class="[$style.infoNumber, $style.addAll]" @click="addAllInfo">Add all</div>
    </div>
    <div :class="$style.informativeNumber">
      <div v-for="number in 9" :key="number" :style="informativeNumberStyles(number)">
        {{ isShowedInfoNumber(number) ? number : "" }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.cell {
  border: 1px solid #888c;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  position: relative;
}

.initial {
  font-weight: bold;
}

.cellDisabled {
  cursor: pointer;

  input {
    color: #fff;
    pointer-events: none;
  }
}

.highlighted {
  background-color: rgba(155, 234, 248, 0.4);
}

.highlightedNumber {
  input {
    color: #1a46d7;
  }
}

.withError {
  font-weight: 300;
  input {
    color: #db4242;
  }
}

.cellValue {
  font-size: 50px;
  max-width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;

  &:focus {
    outline: none;
    background-color: rgba(155, 234, 248, 0.8);
  }
}

.addInfo {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.infoNumberContainer {
  position: absolute;
  bottom: 100%;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  width: 62px;
  gap: 4px;
  user-select: none;
  pointer-events: none;
}

.infoNumber {
  width: 18px;
  height: 18px;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50%;
  background-color: #38c3fa;
  pointer-events: all;
  cursor: pointer;
}

.addAll {
  width: auto;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 9px;
}

.showed {
  background-color: #fff;
  color: #37474f;
}

.disabled {
  pointer-events: none;
  opacity: 0;
}

.informativeNumber {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 2px;
  left: 4px;
  pointer-events: none;
  font-size: 12px;
  color: #ffffffe6;
  display: grid;
  grid-template-columns: 15px 15px 15px 15px 15px;
  grid-template-rows: 15px 15px 15px 15px 15px;
  grid-template-areas:
    "i1 . . . ."
    "i2 . . . ."
    "i3 . . . ."
    "i4 . . . ."
    "i5 i6 i7 i8 i9";
}
</style>
