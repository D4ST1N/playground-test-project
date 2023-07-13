<script setup lang="ts">
import { User, useUserStore } from "@/store/user";

interface menuItem {
  name: string;
  icon: string;
  title: string;
}

const { user } = defineProps<{
  user: User;
}>();
const userStore = useUserStore();
const userMenu: menuItem[] = [
  {
    name: "logout",
    icon: "mdi-logout",
    title: "Logout",
  },
];

function menuItemClick(menuItem: menuItem) {
  switch (menuItem.name) {
    case "logout":
      userStore.logout();
      break;

    default:
      break;
  }
}
</script>

<template>
  <div :class="$style.user">
    <v-menu open-on-hover transition="slide-y-transition">
      <template #activator="{ props }">
        <v-btn append-icon="mdi-menu-down" variant="plain" v-bind="props">
          {{ user.name }}
        </v-btn>
      </template>

      <v-list :width="180">
        <v-list-item
          v-for="(item, index) in userMenu"
          :key="index"
          :value="item.name"
          :ripple="true"
          @click="menuItemClick(item)"
        >
          <template #prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <img :src="user.avatar" :alt="user.name" :class="$style.avatar" />
  </div>
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
}
</style>
