<script setup>
import { Icon } from "@iconify/vue";
defineProps([
  "icon", // icon name
  "width", // icon width
  "height", // icon height
  "color", // icon color
  "class", // icon class
]);
</script>
<template>
  <Icon
    :icon="icon"
    :width="width"
    :height="height"
    :color="color"
    :class="class"
  />
</template>
<style scoped></style>
