<script setup>
import { computed, onMounted, ref } from "vue";
import getLocations from "../api/getLocations";
import getCompetitors from "../api/getCompetitors";
const Locations = ref([]);
const selectedLocation = ref(null);
const competitors = ref([]);
const selectedCompetitor = ref(null);
const loading = ref(false);

const computedLocations = computed(() => {
  for (const key in Location.value) {
    if (Location.value.hasOwnProperty.call(Location.value, key)) {
      const element = Location.value[key];
      console.log(element);
    }
  }
});
const getLocationsFunc = async () => {
  try {
    loading.value = true;
    const res = await getLocations(); // Assuming getLocations returns a Promise
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
    const res = await getCompetitors(); // Assuming getLocations returns a Promise
    loading.value = false;
    console.log(res);

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
          <SelectBox :options="Locations" />
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
          <SelectBox :options="competitors" />
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
