<script setup>
import { useStore } from "../stores";

const store = useStore();
</script>
<template>
  <header class="bg-zinc-50 dark:bg-zinc-900">
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
            <img
              alt="Man"
              :src="`https://placehold.it/100x100?text=${store.userDetails.name.substring(
                0,
                1
              )}`"
              class="h-10 w-10 rounded-full object-cover"
            />
            <p class="ms-2 hidden text-left text-xs sm:block">
              <strong class="block font-medium dark:text-zinc-50"
                >Welcome</strong
              >
              <span class="text-zinc-500 dark:text-zinc-300">
                {{ store.userDetails.name }}
              </span>
            </p>
          </button>
          <button
            @click="store.toggleDark()"
            class="p-2.5 bg-zinc-100 rounded-full text-zinc-800 hover:bg-zinc-800 hover:text-zinc-50 transition dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-800"
          >
            <Icon
              :icon="
                store.isDark
                  ? 'line-md:sunny-outline-to-moon-alt-loop-transition'
                  : 'line-md:moon-filled-to-sunny-filled-loop-transition'
              "
              class="w-6 h-6"
            />
          </button>
          <button
            @click="store.logout()"
            class="p-2.5 bg-red-50 rounded-full text-red-800 hover:bg-red-800 hover:text-red-50 transition dark:bg-red-800 dark:text-red-50 dark:hover:bg-red-50 dark:hover:text-red-800"
          >
            <Icon icon="ion:log-out-outline" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped></style>
