import { defineStore } from "pinia";

export const useStore = defineStore("comparateStore", {
  state: () => ({
    isUser: false,
    user: null,
    userDetails: {},
    isDark: false,
    lang: "en",
  }),
  actions: {
    logout() {
      this.isUser = false;
      this.user = null;
      this.userDetails = {};
      this.router.push("/login");
    },
  },
  persist: true,
});
