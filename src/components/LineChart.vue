<template>
  <div class="card">
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="h-[50px] w-[100px]"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import Chart from "primevue/chart";

const props = defineProps({
  productChart: {
    type: Object,
    required: true,
  },
});
onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
const formattedData = computed(() => {
  const data = {
    labels: [],
    storeVals: [],
    competitorVals: [],
  };

  // Check if props.productChart is defined and has the necessary nested structure
  if (props.productChart) {
    // Extract data from the "store" array
    if (props.productChart.store) {
      data.labels = props.productChart.store.map(
        (item) => Object.keys(item)[0]
      );
      data.storeVals = props.productChart.store.map(
        (item) => Object.values(item)[0]
      );
    }

    // Extract data from the "competitor" array
    if (props.productChart.competitor) {
      data.competitorVals = props.productChart.competitor.map(
        (item) => Object.values(item)[0]
      );
    }
  }

  return data;
});
const setChartData = () => {
  return {
    labels: formattedData.value.labels,
    datasets: [
      {
        data: formattedData.value.competitorVals,
        fill: false,
        borderColor: "#dc2625",
        tension: 0.4,
      },
      {
        data: formattedData.value.storeVals,
        fill: false,
        borderColor: "#16a349",
        tension: 0.4,
      },
    ],
  };
};
const setChartOptions = () => {
  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };
};
</script>
