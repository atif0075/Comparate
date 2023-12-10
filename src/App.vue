<template>
  <div class="bg-white dark:bg-zinc-800 p-2">
    <RouterView />
  </div>
</template>
<script setup>
import { onMounted } from "vue";
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
<style>
:root {
  --el-color-primary: #0ba545 !important;
}
</style>
