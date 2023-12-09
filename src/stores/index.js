import { defineStore } from "pinia";

export const useStore = defineStore("afrihouzStore", {
  state: () => ({
    isUser: false,
    user: null,
    userDetails: {},
    isDark: false,
    lang: "en",
  }),
  actions: {},
  persist: true,
});
