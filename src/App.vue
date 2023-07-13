<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "@/components/UI/Layout.vue";
import Header from "./components/UI/Header.vue";
import UserPanel from "./components/User/UserPanel.vue";
</script>

<template>
  <div>
    <Layout>
      <template #header>
        <Header>
          <template #actions>
            <UserPanel />
          </template>
        </Header>
      </template>
      <RouterView />
    </Layout>
  </div>
</template>
