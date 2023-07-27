<script lang="ts" setup>
import ControlInformation from "@/components/UI/ControlInformation/ControlInformation.vue";
import { minesweeperControls } from "@/helpers/games/minesweeper/controlInformation";
</script>

<template>
  <ControlInformation :controls="minesweeperControls" />
</template>
