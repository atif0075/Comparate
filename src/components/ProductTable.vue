<script setup>
import { computed, ref, toRef } from "vue";
import { ElPagination, ElDialog } from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
const props = defineProps({
  matchedProducts: {
    type: Array,
    required: true,
  },
  selectedLocation: {
    type: Object,
    required: true,
  },
  selectedCompetitor: {
    type: Object,
    required: true,
  },
});
// props to ref
let matchedProducts = toRef(props, "matchedProducts");
// limit data to 6
const limit = ref([0, 6]);
const currentPage = ref(1);
const setLimit = (e) => {
  currentPage.value = e;
  limit.value = [(e - 1) * 6, e * 6];
};
const search = ref("");

// search computed
const filteredMatchedProducts = computed(() => {
  const filteredProducts = matchedProducts.value.filter((product) => {
    const productName = product.Name.toLowerCase();
    const searchValue = search.value.toLowerCase();
    return searchValue === "" || productName.includes(searchValue);
  });

  return filteredProducts;
});
const limitFilteredMatchedProducts = computed(() => {
  return filteredMatchedProducts.value.slice(limit.value[0], limit.value[1]);
});
const searchInput = ref(null);
</script>
<template>
  <section class="container px-4 mx-auto">
    <input
      v-if="limitFilteredMatchedProducts.length > 0"
      ref="searchInput"
      type="text"
      v-model="search"
      placeholder="Search"
      class="w-[100px] focus:w-full transition-all ease-in-out duration-700 px-4 py-3 max-w-md rounded-full outline-none focus:border-green-500 dark:focus:border-green-500 border border-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
    />

    <div class="flex flex-col mt-6">
      <div class="overflow-x-auto lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden border border-zinc-200 dark:border-zinc-600 rounded-2xl"
          >
            <table
              class="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700"
            >
              <thead class="bg-zinc-50 dark:bg-zinc-800">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 px-4 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
                  >
                    <button
                      class="flex items-center gap-x-3 focus:outline-none"
                    >
                      <span> Product Name </span>
                    </button>
                  </th>

                  <th
                    scope="col"
                    class="px-4 py-3.5 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
                  >
                    {{ selectedLocation.name }} Price
                  </th>

                  <th
                    scope="col"
                    class="px-4 py-3.5 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
                  >
                    {{ selectedCompetitor.name }} Price
                  </th>
                  <th
                    scope="col"
                    class="px-12 py-3.5 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
                  >
                    Price Difference
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
                  >
                    Chart
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-sm whitespace-nowrap font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400"
                  >
                    View
                  </th>
                </tr>
              </thead>
              <tbody
                v-if="limitFilteredMatchedProducts.length > 0"
                class="bg-white divide-y divide-zinc-200 dark:divide-zinc-700 dark:bg-zinc-900"
              >
                <tr
                  v-for="product in limitFilteredMatchedProducts"
                  :key="product.id"
                >
                  <td
                    class="px-4 py-4 text-sm font-medium max-w-sm min-w-[24rem]"
                  >
                    <div>
                      <h2 class="font-medium text-zinc-800 dark:text-white">
                        {{ product.Name }}
                      </h2>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <div>
                      <p class="text-zinc-500 dark:text-zinc-400">
                        {{ product["Store Price"] }}
                      </p>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <div>
                      <p class="text-zinc-500 dark:text-zinc-400">
                        {{ product["Competitor Price"] }}
                      </p>
                    </div>
                  </td>
                  <td class="px-12 py-4 text-sm font-medium">
                    <span
                      class="px-2 py-1 inline-flex items-center space-x-1 text-xs leading-5 font-semibold rounded-lg"
                      :class="{
                        'bg-green-100 text-green-800':
                          product['Price Difference'] < 0,
                        'bg-red-100 text-red-800':
                          product['Price Difference'] > 0,
                        'bg-zinc-100 text-zinc-800':
                          product['Price Difference'] === 0,
                      }"
                    >
                      <Icon
                        v-if="product['Price Difference'] < 0"
                        class="w-4 h-4 text-green-500"
                        icon="material-symbols:arrow-upward-alt"
                      />
                      <Icon
                        v-else-if="product['Price Difference'] > 0"
                        class="w-4 h-4 text-red-500"
                        icon="material-symbols:arrow-downward-alt"
                      />
                      {{ product["Price Difference"].toFixed(2) }}
                    </span>
                  </td>
                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <LineChart />
                  </td>

                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <button
                      @click="product.view = true"
                      class="bg-zinc-100 dark:bg-zinc-700 rounded-md p-2"
                    >
                      <Icon
                        class="w-5 h-5 text-zinc-500 dark:text-zinc-300"
                        icon="material-symbols:arrow-forward-rounded"
                      />
                    </button>
                    <el-dialog
                      title="Price Comparison"
                      v-model="product.view"
                      class="!w-full !max-w-2xl !rounded-2xl"
                    >
                      <line-chart-expand></line-chart-expand>
                    </el-dialog>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr
                  class="bg-white divide-y divide-zinc-200 dark:divide-zinc-700 dark:bg-zinc-900"
                >
                  <td
                    colspan="6"
                    class="px-4 py-4 text-sm font-medium text-center"
                  >
                    <div
                      class="p-3 text-base flex flex-col justify-center items-center font-medium text-red-500 rounded-xl bg-red-50 dark:bg-zinc-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                      </svg>
                      <span> No products found </span>
                    </div>
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
        :page-size="6"
        :hide-on-single-page="true"
        background
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="
          search === ''
            ? matchedProducts.length
            : filteredMatchedProducts.length
        "
      />
    </div>
  </section>
</template>
<style scoped></style>
