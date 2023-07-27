<script lang="ts" setup>
import ControlInformation from "@/components/UI/ControlInformation/ControlInformation.vue";
import { tetrisControls } from "@/helpers/games/tetris/controlInformation";
</script>

<template>
  <ControlInformation :controls="tetrisControls" />
</template>
