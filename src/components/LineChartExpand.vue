<template>
  <LineChart
    height="50px"
    width="100px"
    :chartData="testData"
    :options="options"
  />
</template>

<script setup>
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const testData = {
  labels: ["", "", "", "", "", "", "", ""],
  datasets: [
    {
      data: [20, 25, 20, 30, 20, 35, 22, 10],
      backgroundColor: ["#fde2e1"],
      tension: 0.2,
      // make points radius 0
      pointRadius: 0,

      // line color
      borderColor: "#981b1b",
      // line width
      borderWidth: 1,
    },
    {
      data: [30, 20, 35, 20, 30, 20, 35, 20],
      backgroundColor: ["#dcfce6"],
      tension: 0.6,
      // make points radius 0
      pointRadius: 0,
      // line color
      borderColor: "#166434",
      // line width
      borderWidth: 1,
    },
  ],
};
const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
  },
  // hide left and bottom line
};
</script>
<style></style>
