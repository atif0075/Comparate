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
    toggleDark() {
      let html = document.getElementsByTagName("html");
      if (this.isDark) {
        html[0].classList.remove("dark");
        this.isDark = false;
      } else {
        html[0].classList.add("dark");
        this.isDark = true;
      }
    },
  },
  persist: true,
});
