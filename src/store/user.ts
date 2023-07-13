import { defineStore } from "pinia";
import { ref } from "vue";

export interface User {
  name: string;
  avatar: string;
  id: string;
}

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<User | null>(null);

    function setUser(newUser: User) {
      user.value = newUser;
    }

    function logout() {
      user.value = null;
    }

    return { user, setUser, logout };
  },
  { persist: true },
);
