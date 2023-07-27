<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
  <div :class="$style.gameButtonsWrapper">
    <div v-if="!user" :class="$style.notAuthorizedBadge">
      You need to be authorized to play games
    </div>
    <slot name="buttons" :button-disable="!user" />
  </div>
</template>

<style lang="scss" module>
.gameButtonsWrapper {
  position: absolute;
  top: 0;
  left: 260px;
  width: calc(100% - 260px);
  height: calc(100% - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
}

.notAuthorizedBadge {
  padding: 20px 32px;
  color: var(--main-secondary-color);
  background: linear-gradient(
    90deg,
    #0f0b0c00 0%,
    var(--main-darkest-color) 30%,
    var(--main-darkest-color) 70%,
    #0f0b0c00 100%
  );
}
</style>
