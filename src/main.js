import { createApp, markRaw } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./routes";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import "./stores";

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
createApp(App).use(PrimeVue).use(router).use(pinia).mount("#app");
