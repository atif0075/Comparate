<script setup>
import { useStore } from "../stores";

const store = useStore();
</script>
<template>
  <!--
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
-->

  <header class="bg-zinc-50">
    <div class="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between sm:gap-4">
        <div>
          <img
            src="../assets/logo-dark.svg"
            alt="logo"
            class="h-10 w-auto sm:h-12"
          />
        </div>
        <div class="flex flex-1 items-center gap-6 justify-end">
          <button
            type="button"
            class="group flex shrink-0 items-center rounded-lg transition"
          >
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              class="h-10 w-10 rounded-full object-cover"
            />
            <p class="ms-2 hidden text-left text-xs sm:block">
              <strong class="block font-medium">Welcome</strong>
              <span class="text-zinc-500"> infinitebyte </span>
            </p>
          </button>
          <button
            @click="store.logout()"
            class="p-2.5 bg-red-50 rounded-full text-red-800 hover:bg-red-800 hover:text-red-50 transition"
          >
            <Icon icon="ion:log-out-outline" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped></style>
