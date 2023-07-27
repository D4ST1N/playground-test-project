<script lang="ts" setup>
import ControlInformation from "@/components/UI/ControlInformation/ControlInformation.vue";
import { sudokuControls } from "@/helpers/games/sudoku/controlInformation";
</script>

<template>
  <ControlInformation :controls="sudokuControls" />
</template>
