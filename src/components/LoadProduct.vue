<script setup>
import { onMounted, ref, watchEffect } from "vue";
import getProduct from "../api/getProduct";
const props = defineProps({
  product_id: {
    type: String,
    required: true,
  },
});
const product = ref({});
onMounted(async () => {
  await getProduct(props.product_id)
    .then((res) => {
      console.log(res);
      product.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
const data = [
  "Garden Of Eden Price Diff",
  "Product ID",
  "Store Price",
  "Wegman Price Diff",
  "Wholes Food Price Diff",
];
</script>
<template>
  <div class="relative overflow-x-auto">
    <table
      class="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
    >
      <thead
        class="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3 whitespace-nowrap">Label</th>
          <th scope="col" class="px-6 py-3 whitespace-nowrap">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key, index) in product"
          :key="index"
          class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700"
        >
          <th class="px-6 py-4 whitespace-nowrap">{{ key }}</th>
          <td class="px-6 py-4 whitespace-nowrap">{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style></style>
