<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import getLocations from "../api/getLocations";
import getCompetitors from "../api/getCompetitors";
import getMatchedProducts from "../api/getMatchedProducts";
import Navbar from "@/components/Navbar.vue";
import SelectBox from "@/components/SelectBox.vue";

const Locations = ref([]);
const selectedLocation = ref(null);
const competitors = ref([]);
const selectedCompetitor = ref(null);
const loading = ref(false);
const matchedProducts = ref([]);

const getLocationsFunc = async () => {
  try {
    loading.value = true;
    const res = await getLocations();
    loading.value = false;
    Locations.value = Object.keys(res["locations"]).map((key) => ({
      name: key,
      id: res["locations"][key],
    }));
  } catch (error) {
    console.error("Failed to get locations:", error);
  }
};

const getCompetitorsFunc = async () => {
  try {
    loading.value = true;
    const res = await getCompetitors();
    loading.value = false;
    competitors.value = Object.keys(res["competitors"]).map((key) => ({
      name: key,
      id: res["competitors"][key],
    }));
  } catch (error) {
    console.error("Failed to get competitors:", error);
  }
};

onMounted(() => {
  getLocationsFunc();
  getCompetitorsFunc();
});

watchEffect(async () => {
  if (selectedLocation.value && selectedCompetitor.value) {
    console.log(
      `Selected location: ${selectedLocation.value.id}, Selected competitor: ${selectedCompetitor.value.id}`
    );
    try {
      loading.value = true;
      const res = await getMatchedProducts(
        selectedLocation.value.id,
        selectedCompetitor.value.id
      );
      loading.value = false;
      console.log(res["data"]);
      matchedProducts.value = res["data"];
    } catch (error) {
      console.error("Failed to get matched products:", error);
    }
  }
});
</script>

<template>
  <Navbar />
  <main class="py-20 container mx-auto">
    <div
      class="bg-zinc-100 p-2 sm:p-5 md:p-10 rounded-2xl flex justify-center items-center flex-col max-w-xl mx-auto"
    >
      <h1 class="text-xl sm:text-2xl font-semibold text-zinc-800 text-center">
        Products Comparison
      </h1>
      <div
        class="flex justify-center md:justify-between items-center md:space-x-1 mt-5 w-full"
      >
        <div class="w-[40%]">
          <p class="text-xs text-zinc-500">Your Store</p>
          <SelectBox
            :options="Locations"
            @onChange="selectedLocation = $event"
          />
        </div>
        <div class="w-[20%] flex justify-center items-center">
          <img
            src="http://65.21.148.182:3000/static/media/vs.d91be0e87a8c24664b27.png"
            alt="vs"
            class="w-10 h-10"
          />
        </div>
        <div class="w-[40%]">
          <p class="text-xs text-zinc-500">Competitor Store</p>
          <SelectBox
            :options="competitors"
            @onChange="selectedCompetitor = $event"
          />
        </div>
      </div>
    </div>

    <div
      v-if="selectedLocation && selectedCompetitor && !loading"
      class="relative overflow-x-auto mt-10"
    >
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Product name</th>
            <th scope="col" class="px-6 py-3">
              {{ selectedLocation.name }} Price
            </th>
            <th scope="col" class="px-6 py-3">
              {{ selectedCompetitor.name }} Price
            </th>
            <th scope="col" class="px-6 py-3">Price Difference</th>
            <th scope="col" class="px-6 py-3">View</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in matchedProducts"
            :key="product.id"
            class="bg-white dark:bg-gray-800"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ product.Name }}
            </th>
            <td class="px-6 py-4">
              {{ product["Store Price"] }}
            </td>
            <td class="px-6 py-4">
              {{ product["Competitor Price"] }}
            </td>
            <td class="px-6 py-4">
              <span
                class="px-2 py-1 inline-flex items-center space-x-1 text-xs leading-5 font-semibold rounded-md"
                :class="{
                  'bg-green-100 text-green-800':
                    product['Price Difference'] > 0,
                  'bg-red-100 text-red-800': product['Price Difference'] < 0,
                }"
              >
                <Icon
                  v-if="product['Price Difference'] > 0"
                  class="w-4 h-4 text-green-500"
                  icon="material-symbols:arrow-upward-alt"
                />
                <Icon
                  v-else-if="product['Price Difference'] < 0"
                  class="w-4 h-4 text-red-500"
                  icon="material-symbols:arrow-downward-alt"
                />
                {{ product["Price Difference"].toFixed(2) }}
              </span>
            </td>
            <td class="px-6 py-4">
              <button class="bg-gray-50 rounded-md p-2">
                <Icon
                  class="w-5 h-5 text-gray-500"
                  icon="material-symbols:arrow-forward-rounded"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
<style scoped></style>
