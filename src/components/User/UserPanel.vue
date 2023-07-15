<script lang="ts" setup>
import { ref } from "vue";
import { User, useUserStore } from "@/store/user";
import UserAuth from "@/components/User/UserAuth.vue";
import UserProfile from "./UserProfile.vue";

const store = useUserStore();
const showModal = ref(false);

function openLoginModal() {
  showModal.value = true;
}

function closeLoginModal() {
  showModal.value = false;
}

function setUser(user: User) {
  closeLoginModal();
  store.setUser(user);
}
</script>

<template>
  <div>
    <UserProfile v-if="store.user" :user="store.user" @change-user="openLoginModal" />
    <v-btn v-else @click="openLoginModal">Authenticate</v-btn>
    <UserAuth :showModal="showModal" @close-dialog="closeLoginModal" @submit-dialog="setUser" />
  </div>
</template>
