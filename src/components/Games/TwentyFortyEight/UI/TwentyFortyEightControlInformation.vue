<script lang="ts" setup>
import ControlInformation from "@/components/UI/ControlInformation/ControlInformation.vue";
import { twentyFortyEightControlInformation } from "@/helpers/games/twentyFortyEight/controlInformation";
</script>

<template>
  <ControlInformation :controls="twentyFortyEightControlInformation" />
</template>
