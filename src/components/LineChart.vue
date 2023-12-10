<template>
  <LineChart height="50px"
   width="100px"
  :chartData="testData" :options="options" />
</template>

<script setup>
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const testData = {
  labels: ["", "", "", ""],
  datasets: [
    {
      data: [10, 35, 12, 10],
      backgroundColor: ["#dcfce6", "#fde2e1"],
      tension: 0.6,
      // make points radius 0
      pointRadius: 0.4,
      // line color
      borderColor: "#981b1b",
      // line width
      borderWidth: 1,
    },
    {
      data: [30, 20, 35, 20],
      backgroundColor: ["#dcfce6", "#fde2e1"],
      tension: 0.6,
      // make points radius 0
      pointRadius: 0.4,
      // line color
      borderColor: "#166434",
      // line width
      borderWidth: 1,
    },
  ],
};
const options = {
  drawOnChartArea: false,
  responsive: true,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  // hide left and bottom line
};
</script>
<style></style>
