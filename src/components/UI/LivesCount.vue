<script setup lang="ts">
const props = defineProps<{
  livesCount: number;
}>();
</script>

<template>
  <div :class="$style.livesCountWrapper">
    <div :class="[$style.liveCountPart, $style.livesCountLeft]"></div>
    <div :class="[$style.liveCountPart, $style.livesCountTop]"></div>
    <div :class="[$style.liveCountPart, $style.livesCountBottom]"></div>
    <div :class="[$style.liveCountPart, $style.livesCountRight]"></div>
    <div :class="$style.livesCount">{{ props.livesCount }}</div>
  </div>
</template>

<style lang="scss" module>
.livesCountWrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 48px;
  rotate: -45deg;
  scale: 0.66;
}

.liveCountPart {
  width: 24px;
  height: 24px;
  background-color: #eeb33d;
  border: 2px solid #b76335;
  position: relative;

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

.livesCountBottom {
  border-top: 0;
  border-right: 0;

  &::before {
    border-top: 0;
    border-right: 0;
  }
}

.livesCountLeft {
  border-bottom: 0;
  translate: 0 3px;
  transform-origin: 0 0;
  scale: 1.1 0.9;

  &::before {
    border-bottom: 0;
    border-right: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    width: calc(100% + 12px);
    height: calc(100% + 1px);
    border: 2px solid transparent;
    border-right-color: #b76335;
  }
}

.livesCountRight {
  border-left: 0;
  translate: -3px 0;
  transform-origin: 100% 100%;
  scale: 0.9 1.1;

  &::before {
    border-left: 0;
    border-top: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: -6px;
    right: -6px;
    width: calc(100% + 1px);
    height: calc(100% + 12px);
    border: 2px solid transparent;
    border-top-color: #b76335;
  }
}

.livesCountTop {
  opacity: 0;
}

.livesCount {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  rotate: 45deg;
  color: var(--main-darkest-color);
  font-size: 28px;
  font-weight: 800;
}
</style>
