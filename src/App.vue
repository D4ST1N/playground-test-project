<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "@/components/UI/Layout.vue";
import Header from "@/components/UI/Header.vue";
import UserPanel from "@/components/User/UserPanel.vue";
import Rules from "@/components/UI/Rules/Rules.vue";
</script>

<template>
  <div>
    <Layout>
      <template #header>
        <Header>
          <template #title>
            <Rules />
          </template>
          <template #actions>
            <UserPanel />
          </template>
        </Header>
      </template>
      <RouterView />
    </Layout>
  </div>
</template>
