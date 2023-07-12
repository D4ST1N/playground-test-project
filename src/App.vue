<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "@/components/UI/Layout.vue";
import Header from "./components/UI/Header.vue";
</script>

<template>
  <div>
    <Layout>
      <template #header>
        <Header />
      </template>
      <RouterView />
    </Layout>
  </div>
</template>
