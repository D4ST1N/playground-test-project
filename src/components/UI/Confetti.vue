<script setup lang="ts">
import ConfettiExplosion from "vue-confetti-explosion";

import { confettiSettings } from "@/helpers/generalConfig";
</script>

<template>
  <div :class="$style.confettiContainer">
    <ConfettiExplosion v-bind="confettiSettings" />
  </div>
</template>

<style lang="scss" module>
.confettiContainer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding-top: 200px;
}
</style>
