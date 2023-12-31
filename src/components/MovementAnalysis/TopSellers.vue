<script setup>
import { computed, reactive, ref, toRef } from "vue";
const td = [
  {
    name: "Base Price",
    key: "base_price",
    sort: "asc",
    type: "number",
  },
  {
    name: "Brand",
    key: "brand",
    sort: "asc", // Assuming "asc" as the default sorting order
    type: "string",
  },
  {
    name: "Current On Hand",
    key: "current_on_hand",
    sort: "asc",
    type: "number",
  },
  {
    name: "Item ID",
    key: "item_id",
    sort: "asc",
    type: "string",
  },
  {
    name: "Last Cost",
    key: "last_cost",
    sort: "asc",
    type: "number",
  },
  {
    name: "Price Divider",
    key: "price_divider",
    sort: "asc",
    type: "number",
  },
  {
    name: "Projected Margin",
    key: "projected_margin",
    sort: "asc",
    type: "number",
  },
  {
    name: "Quantity Sold",
    key: "quantity_sold",
    sort: "asc",
    type: "number",
  },
  {
    name: "Receipt Alias",
    key: "receipt_alias",
    sort: "asc",
    type: "string",
  },
  {
    name: "Revenue",
    key: "revenue",
    sort: "asc",
    type: "number",
  },
  {
    name: "Supplier ID",
    key: "supplier_id",
    sort: "asc",
    type: "number",
  },
];

const props = defineProps({
  movement_analysis: {
    type: Object,
    default: () => {},
  },
  SellerType: {
    type: String,
    default: "Quantity",
  },
});
// const movement_analysis = defineModel();
const topSellers = toRef(props, "movement_analysis");
const data = ref({
  sortBy: null,
  sortDesc: false,
});

const currentPage = ref(1);
const pageSize = 10;
const searchData = ref("");

const filterTSQ = computed(() => {
  let filteredData = topSellers.value;

  if (searchData.value) {
    const query = searchData.value.toLowerCase();
    filteredData = filteredData.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(query)
      )
    );
  }
  //   sort data
  if (data.value.sortBy) {
    filteredData.sort((a, b) => {
      if (data.value.sortDesc) {
        return a[data.value.sortBy] < b[data.value.sortBy] ? 1 : -1;
      } else {
        return a[data.value.sortBy] > b[data.value.sortBy] ? 1 : -1;
      }
    });
  }

  return filteredData.slice(
    (currentPage.value - 1) * pageSize,
    currentPage.value * pageSize
  );
});

const handleSort = (column) => {
  if (data.value.sortBy === column) {
    data.value.sortDesc = !data.value.sortDesc;
  } else {
    data.value.sortBy = column;
    data.value.sortDesc = false;
  }
};

const setLimit = (limit) => {
  currentPage.value = limit;
};
</script>
<template>
  <section class="container px-4 mx-auto">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-x-3">
          <h2 class="text-lg font-medium text-zinc-800 dark:text-white">
            Top Sellers By {{ SellerType }}
          </h2>

          <span
            class="px-3 py-1 text-xs text-green-600 bg-green-100 rounded-full dark:bg-zinc-800 dark:text-green-400"
          >
            {{ topSellers.length }}
            Sellers</span
          >
        </div>

        <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-300">
          {{
            SellerType === "Quantity"
              ? "This is a list of top sellers by quantity."
              : "This is a list of top sellers by revenue."
          }}
        </p>
      </div>
    </div>

    <div class="mt-6 md:flex md:items-center md:justify-between">
      <div class="relative flex items-center mt-4 md:mt-0">
        <span class="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mx-3 text-zinc-400 dark:text-zinc-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>

        <input
          type="text"
          v-model="searchData"
          placeholder="Search"
          class="block w-full py-1.5 pr-5 text-zinc-700 bg-white border border-zinc-200 rounded-lg md:w-80 placeholder-zinc-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-600 focus:border-green-400 dark:focus:border-green-300 focus:ring-green-300 focus:outline-none"
        />
      </div>
    </div>

    <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden border border-zinc-200 dark:border-zinc-700 md:rounded-lg"
          >
            <table
              class="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700"
            >
              <thead class="bg-zinc-50 dark:bg-zinc-800">
                <tr>
                  <th
                    v-for="(item, index) in td"
                    :key="index"
                    scope="col"
                    class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
                  >
                    <button
                      @click="handleSort(item.name)"
                      class="flex items-center gap-x-3 focus:outline-none whitespace-nowrap"
                    >
                      <span>
                        {{ item.name }}
                      </span>
                      <Icon
                        v-if="data.sortBy === item.name"
                        :icon="
                          data.sortDesc
                            ? 'bi:caret-down-fill'
                            : 'bi:caret-up-fill'
                        "
                        class="w-4 h-4"
                      />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white divide-y divide-zinc-200 dark:divide-zinc-700 dark:bg-zinc-900"
              >
                <tr
                  v-for="(item, index) in filterTSQ"
                  :key="index"
                  class="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <td
                    v-for="items in td"
                    :key="items"
                    class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                  >
                    <p
                      class="text-sm font-normal text-zinc-600 dark:text-zinc-400"
                    >
                      {{ item[items.name] }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center mt-6">
      <el-pagination
        @current-change="setLimit($event)"
        :page-size="10"
        :hide-on-single-page="true"
        background
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="topSellers.length"
      />
    </div>
  </section>
</template>
<style scoped></style>
