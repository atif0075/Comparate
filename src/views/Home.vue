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
  <main class="py-20 container mx-auto min-h-screen">
    <div
      class="bg-zinc-100 dark:bg-zinc-900 relative p-2 sm:p-5 md:p-10 rounded-2xl flex justify-center items-center flex-col max-w-2xl mx-auto border dark:border-zinc-700"
    >
      <div
        v-if="loading"
        class="absolute top-0 left-0 w-full h-full rounded-2xl z-[100] bg-zinc-100 dark:bg-zinc-800 dark:bg-opacity-70 bg-opacity-70 flex justify-center items-center"
      >
        <Icon icon="svg-spinners:180-ring" class="w-10 h-10 text-green-400" />
      </div>
      <h1
        class="text-xl sm:text-2xl font-semibold text-zinc-800 dark:text-zinc-50 text-center"
      >
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
      <product-table
        :matchedProducts="matchedProducts"
        :selectedLocation="selectedLocation"
        :selectedCompetitor="selectedCompetitor"
      />
    </div>
  </main>
</template>
<style scoped></style>
