<script setup>
import { ElUpload, vLoading } from "element-plus";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import postUpload from "../api/postUpload";
import postMovementMatch from "../api/postMovementMatch";
import { reactive, ref } from "vue";
const loading = ref(false);
const top_sellers_by_quantity = ref([]);
const top_sellers_by_revenue = ref([]);
const movement_analysis = reactive({
  tsbq: [],
  tsbr: [],
});
const handleChange = (file) => {
  //   console.log(file, fileList);
  loading.value = true;
  postUpload(file)
    .then((res) => {
      console.log(res);
      top_sellers_by_quantity.value = res.message.top_sellers_by_quantity;
      top_sellers_by_revenue.value = res.message.top_sellers_by_revenue;
      loading.value = false;
    })
    .catch((err) => {
      loading.value = false;
    });
  postMovementMatch(file).then((res) => {
    movement_analysis.tsbq = res.message.top_sellers_by_quantity;
    movement_analysis.tsbr = res.message.top_sellers_by_revenue;
  });
};
</script>
<template>
  <div>
    <div class="space-y-4">
      <el-tabs
        v-if="
          top_sellers_by_quantity.length > 0 ||
          top_sellers_by_revenue.length > 0
        "
        type="border-card"
      >
        <el-tab-pane label="Top Sellers By Quantity">
          <TopSellers :movement_analysis="top_sellers_by_quantity" />
        </el-tab-pane>
        <el-tab-pane label="Top Sellers By Revenue">
          <TopSellers
            :movement_analysis="top_sellers_by_revenue"
            SellerType="Revenue"
          />
        </el-tab-pane>
      </el-tabs>
      <div
        v-if="movement_analysis.tsbq.length > 0"
        class="w-full rounded-2xl bg-zinc-100 dark:bg-zinc-700 p-2"
      >
        <Disclosure v-slot="{ open }">
          <DisclosureButton
            class="flex w-full justify-between items-center rounded-lg bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-800 px-4 py-2 text-left text-sm font-medium dark:text-zinc-400 text-zinc-900 hover:bg-zinc-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
          >
            <span class="text-2xl"> Movement Match </span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-green-500"
            />
            <Icon
              icon="bi:caret-down-fill"
              class="w-4 h-4"
              :class="open ? 'rotate-180 transform' : ''"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
            <el-tabs type="border-card">
              <el-tab-pane label="Top Sellers By Quantity">
                <MovementMatch :movement_analysis="movement_analysis.tsbq" />
              </el-tab-pane>
              <el-tab-pane label="Top Sellers By Revenue">
                <MovementMatch :movement_analysis="movement_analysis.tsbr" />
              </el-tab-pane>
            </el-tabs>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </div>
  <div
    v-if="
      top_sellers_by_quantity.length == 0 && top_sellers_by_revenue.length == 0
    "
    v-loading="loading"
    class="rounded-lg overflow-hidden mx-auto max-w-xl"
  >
    <el-upload drag :onChange="handleChange">
      <div class="flex justify-center items-center">
        <Icon icon="lets-icons:upload-fill" class="w-10 h-10 text-green-400" />
      </div>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload>
  </div>
</template>
<style>
.el-tabs--border-card {
  border-radius: 12px;
  overflow: hidden;
}
/* .el-upload-dragger {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #179a49;
}
.is-dragover {
  border: 3px solid #179a49 !important;
} */
</style>
