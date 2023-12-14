<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar />
  <main class="py-20 container mx-auto min-h-screen p-2">
    <RouterView />
  </main>
</template>
<style scoped></style>
