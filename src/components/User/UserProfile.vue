<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { User, useUserStore } from "@/store/user";
import UserLogoutConfirmation from "@/components/User/UserLogoutConfirmation.vue";

interface menuItem {
  name: string;
  icon: string;
  title: string;
}

const { user } = defineProps<{
  user: User;
}>();
const emit = defineEmits(["change-user"]);
const router = useRouter();
const userStore = useUserStore();
const userMenu: menuItem[] = [
  {
    name: "logout",
    icon: "mdi-logout",
    title: "Logout",
  },
  {
    name: "change-user",
    icon: "mdi-account",
    title: "Change user",
  },
];
const showConfirmationDialog = ref<boolean>(false);

function menuItemClick(menuItem: menuItem) {
  switch (menuItem.name) {
    case "logout":
      showConfirmationDialog.value = true;
      break;

    case "change-user":
      emit("change-user");
      break;

    default:
      break;
  }
}

function closeConfirmationDialog() {
  showConfirmationDialog.value = false;
}

function logout() {
  closeConfirmationDialog();
  userStore.logout();
  router.go(0);
}
</script>

<template>
  <div :class="$style.user">
    <img :src="user.avatar" :alt="user.name" class="elevation-12" :class="$style.avatar" />
    <v-menu open-on-click transition="slide-y-transition">
      <template #activator="{ props }">
        <v-btn append-icon="mdi-menu-down" variant="plain" v-bind="props">
          {{ user.name }}
        </v-btn>
      </template>

      <v-list :width="220" bg-color="var(--main-darkest-color)">
        <v-list-item
          v-for="(item, index) in userMenu"
          :key="index"
          :value="item.name"
          :ripple="true"
          :class="$style.menuItem"
          @click="menuItemClick(item)"
        >
          <template #prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
  <UserLogoutConfirmation
    :show-modal="showConfirmationDialog"
    @close-dialog="closeConfirmationDialog"
    @submit-dialog="logout"
  />
</template>

<style lang="scss" module>
.user {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid var(--main-primary-color);
}

.menu {
  background-color: var(--main-dark-color);
}

.menuItem {
  color: var(--main-secondary-color);
}
</style>
