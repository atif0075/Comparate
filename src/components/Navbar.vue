<script setup>
import { useStore } from "../stores";

const store = useStore();
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
  <header class="bg-zinc-50 dark:bg-zinc-800 sticky top-0 left-0 z-[999]">
    <div class="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between sm:gap-4">
        <div>
          <img
            src="../assets/logo.svg"
            alt="logo"
            class="h-10 w-auto sm:h-12 invert dark:invert-0"
          />
        </div>
        <div class="flex flex-1 items-center gap-3 justify-end">
          <button
            type="button"
            class="group flex shrink-0 items-center rounded-lg transition"
          >
            <div
              class="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-300"
            >
              {{ store.userDetails.name ? store.userDetails.name[0] : "" }}
            </div>
            <p class="ms-2 hidden text-left text-xs sm:block">
              <strong class="block font-medium dark:text-zinc-50"
                >Welcome</strong
              >
              <span
                v-if="store.userDetails.name"
                class="text-zinc-500 dark:text-zinc-300"
              >
                {{ store.userDetails.name }}
              </span>
            </p>
          </button>
          <!-- <button
            @click="store.toggleDark()"
            class="p-2.5 bg-zinc-100 rounded-full text-zinc-800 hover:bg-zinc-800 hover:text-zinc-50 transition dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-800"
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
          <button
            @click="store.logout()"
            class="p-2.5 bg-red-50 rounded-full text-red-800 hover:bg-red-800 hover:text-red-50 transition dark:bg-red-800 dark:text-red-50 dark:hover:bg-red-50 dark:hover:text-red-800"
          >
            <Icon icon="ion:log-out-outline" class="w-6 h-6" />
          </button> -->
          <button
            v-if="store.isUser"
            @click="toggleSidebar"
            class="text-zinc-500 lg:hidden dark:text-white focus:outline-none"
          >
            <Icon icon="solar:hamburger-menu-line-duotone" class="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped></style>
