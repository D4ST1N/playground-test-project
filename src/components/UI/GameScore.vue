<script setup lang="ts">
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { timeout } from "@/helpers/generalHelpers";

const props = defineProps<{
  currentScore: number;
}>();
const additions = ref<{ id: string; value: number }[]>([]);

watch(
  () => props.currentScore,
  (newScore: number, oldScore: number) => {
    const diff = newScore - oldScore;
    addAddition(diff);
  },
);

async function addAddition(value: number) {
  const id = uuidv4();
  additions.value.push({ id, value });

  await timeout(550);
  additions.value = additions.value.filter((addition) => addition.id !== id);
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.scoreLabel">Score</div>
    <div :class="$style.scoreWrapper">
      <div :class="$style.score">{{ props.currentScore }}</div>
      <div v-for="addition in additions" :key="addition.id" :class="$style.addition">
        +{{ addition.value }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.scoreWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  gap: 5px;
  padding: 5px;
  position: relative;
}

.scoreLabel {
  font-size: 20px;
  font-weight: bold;
  color: var(--main-primary-color);
  text-transform: uppercase;
}

.score {
  color: var(--main-secondary-color);
  font-weight: bold;
  font-size: 28px;
}

.addition {
  color: var(--main-secondary-color);
  font-weight: bold;
  font-size: 28px;
  position: absolute;
  left: 50%;
  top: 8px;
  animation: addition 0.6s ease;
}

@keyframes addition {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(8px, -40px);
    opacity: 0;
  }
}
</style>
