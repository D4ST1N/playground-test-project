<script setup lang="ts">
import GamesList from "@/components/GamesList.vue";
import PageLayout from "@/components/UI/PageLayout.vue";
</script>

<template>
  <PageLayout :header="false">
    <GamesList />
  </PageLayout>
</template>
