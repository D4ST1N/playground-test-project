<script setup lang="ts">
import TextBadge from "@/components/UI/TextBadge.vue";
</script>

<template>
  <div :class="$style.gameActions">
    <TextBadge>
      <div :class="$style.actionsWrapper">
        <slot name="actions" />
      </div>
    </TextBadge>
  </div>
</template>

<style lang="scss" module>
.gameActions {
  position: fixed;
  bottom: 0;
  left: 260px;
  width: calc(100% - 260px);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: actions-in 0.5s ease-in-out;
  pointer-events: none;
}

.actionsWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  & > * {
    pointer-events: all;
    animation: action-in 1s ease-in-out;
  }
}

@keyframes actions-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes action-in {
  0% {
    translate: 150px 0;
    opacity: 0;
    scale: 0.3;
  }

  100% {
    translate: 0% 0%;
    opacity: 1;
    scale: 1;
  }
}
</style>
