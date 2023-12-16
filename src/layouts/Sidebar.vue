<script setup>
import { ref } from "vue";
import { useStore } from "../stores";
const store = useStore();
const routes = ref([
  {
    path: "/price-comparison",
    name: "Price Comparison",
    icon: "arcticons:price-history",
  },
  {
    path: "/movement-analysis",
    name: "Movement Analysis",
    icon: "uim:analysis",
  },
  {
    path: "/competitors",
    name: "Competitors",
    icon: "gravity-ui:arrows-opposite-to-dots",
  },
]);
const toggleSidebar = () => {
  // remove class
  const sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("hidden")) {
    sidebar.classList.remove("hidden");
  } else {
    sidebar.classList.add("hidden");
  }
};
</script>
<template>
  <div
    class="absolute hidden lg:block lg:static top-0 left-0 h-screen z-[999999] lg:w-[25%] w-[60%] sm:w-[50%] md:w-[30%]"
  >
    <aside
      class="flex flex-col h-screen px-5 py-8 overflow-y-auto bg-white dark:bg-zinc-900 border dark:border-zinc-700"
    >
      <div class="flex flex-col justify-between flex-1 mt-6">
        <nav class="-mx-3 space-y-1 mt-20">
          <div
            v-for="(item, key, index) in routes"
            :key="index"
            class="space-y-1"
          >
            <RouterLink
              class="flex items-center px-3 py-3 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"
              :to="item.path"
              @click="toggleSidebar"
              exact-active-class="active"
              active-class="active"
            >
              <Icon :icon="item.icon" class="w-5 h-5" />
              <span class="mx-2 text-sm font-medium">
                {{ item.name }}
              </span>
            </RouterLink>
          </div>
        </nav>
        <div class="flex justify-between items-center space-x-1">
          <button
            @click="store.logout"
            icon="material-symbols-light:logout"
            class="py-2.5 flex justify-center items-center space-x-2 w-full bg-red-50 rounded-full text-red-800 hover:bg-red-800 hover:text-red-50 transition dark:bg-red-800 dark:text-red-50 dark:hover:bg-red-50 dark:hover:text-red-800"
          >
            <span> Logout </span>
            <Icon icon="ion:log-out-outline" class="w-5 h-5" />
          </button>
          <button
            @click="store.toggleDark()"
            class="p-2.5 bg-zinc-100 rounded-full text-zinc-800 hover:bg-zinc-800 hover:text-zinc-50 transition dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-800"
          >
            <Icon
              v-if="store.isDark"
              icon="line-md:sunny-outline-to-moon-alt-loop-transition"
              class="w-6 h-6"
            />
            <Icon
              v-else
              icon="line-md:moon-filled-to-sunny-filled-loop-transition"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>
<style>
.el-menu {
  border-right: 1px solid #e4e4e4 !important;
}
.active {
  @apply bg-zinc-100 text-green-500 hover:text-green-500 transition-colors duration-300 transform rounded-lg dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-200;
}
</style>
