<script setup lang="ts">
import { watch, ref } from "vue";
import { GameStatus } from "@/helpers/generalTypes";
import StyledTitle from "@/components/UI/StyledTitle.vue";
import TextBadge from "@/components/UI/TextBadge.vue";
import { timeout } from "@/helpers/generalHelpers";

const props = defineProps<{
  status: GameStatus;
}>();
const showVictory = ref<boolean>(false);
const showDefeat = ref<boolean>(false);

watch(
  () => props.status,
  async (newStatus) => {
    if (newStatus === GameStatus.Victory) {
      showVictory.value = true;
      await timeout(3000);
      showVictory.value = false;
    }

    if (newStatus === GameStatus.Defeat) {
      showDefeat.value = true;
      await timeout(3000);
      showDefeat.value = false;
    }
  },
);
</script>

<template>
  <div>
    <div :class="$style.alertContainer">
      <div v-if="showVictory" :class="$style.alert">
        <TextBadge>
          <StyledTitle>Victory!</StyledTitle>
        </TextBadge>
      </div>
      <div v-if="showDefeat" :class="$style.alert">
        <TextBadge>
          <StyledTitle>Defeated!</StyledTitle>
        </TextBadge>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.alertContainer {
  position: fixed;
  width: calc(100% - 260px);
  height: 100%;
  top: 0;
  left: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 1;
}

.alert {
  pointer-events: all;
  animation:
    alert-in 1s ease,
    alert-out 0.5s ease 2.5s;
  font-size: 2.5rem;
}

@keyframes alert-in {
  0% {
    scale: 0.6;
    translate: 0 50%;
    opacity: 0;
  }
  100% {
    scale: 1;
    translate: 0 0;
    opacity: 1;
  }
}

@keyframes alert-out {
  0% {
    scale: 1;
    translate: 0 0;
    opacity: 1;
  }
  100% {
    scale: 10;
    translate: 0 50%;
    opacity: 0;
  }
}
</style>
