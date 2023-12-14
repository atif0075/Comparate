<script setup>
import { onMounted } from "vue";
import Sidebar from "./layouts/Sidebar.vue";
import { useStore } from "./stores";
const store = useStore();
onMounted(() => {
  //  dark mode
  if (store.isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <main class="flex justify-between items-center">
    <Sidebar
      v-if="store.isUser"
      id="sidebar"
      class="absolute hidden lg:block lg:static top-0 left-0 h-screen w-auto z-10"
    />
    <main class="h-screen overflow-auto w-full">
      <RouterView />
    </main>
  </main>
</template>
<style>
:root {
  --el-color-primary: #179a49 !important;
  --el-border-color: #179a49 !important;
  --tw-ring-color: #179a49 !important;
}
</style>
