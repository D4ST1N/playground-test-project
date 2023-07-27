<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  current: number;
  total: number;
  maxLevel?: boolean;
  level?: number;
}>();

const progress = computed(() => {
  if (props.maxLevel) return 100;

  return (props.current / props.total) * 100;
});
</script>

<template>
  <div :class="$style.progressWrapper">
    <div :class="$style.progressBarLevel"></div>
    <div :class="$style.progressBarWrapper">
      <div :class="$style.progressBarBackground">
        <span v-if="!maxLevel" :class="$style.progressValue">{{ current }} / {{ total }}</span>
        <div :class="$style.progress" :style="{ width: `${progress}%` }">
          <span v-if="!maxLevel" :class="[$style.progressValue, $style.dark]">
            {{ current }} / {{ total }}
          </span>
        </div>
      </div>
    </div>
    <div :class="$style.level">
      <span :class="$style.levelValue">{{ props.level }}</span>
    </div>
  </div>
</template>

<style lang="scss" module>
.progressWrapper {
  height: 32px;
  width: 240px;
  position: relative;
  margin-top: 10px;
}

.progressBarLevel {
  width: 24px;
  height: 24px;
  background-color: #eeb33d;
  border: 2px solid #b76335;
  position: absolute;
  top: 4px;
  left: 4px;
  rotate: 45deg;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    width: calc(100% + 12px);
    height: calc(100% + 12px);
    border: 2px solid #b76335;
  }
}

.level {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  rotate: 45deg;
  z-index: 5;
}

.levelValue {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  font-size: 20px;
  color: var(--main-darker-color);
  font-weight: 800;
  rotate: -45deg;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progressBarWrapper {
  position: absolute;
  top: 8px;
  left: 12px;
  width: 240px;
  height: 16px;
  overflow: hidden;
}

.progressBarBackground {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 12px);
  height: 100%;
  background-color: #eeb33d4d;
  // border: 1px solid #eeb33da7;
  transform: skew(-45deg, 0);
}

.progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #eeb33d;
  transition: width 0.5s ease-in-out;
  overflow: hidden;
}

.progressValue {
  position: absolute;
  top: 0;
  left: 0;
  width: 240px;
  height: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  transform: skew(45deg, 0);
}

.dark {
  color: var(--main-darker-color);
}
</style>
