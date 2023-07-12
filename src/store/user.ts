import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("user", () => {
  const someState = ref("hello pinia");

  return { someState };
}, { persist: true });
