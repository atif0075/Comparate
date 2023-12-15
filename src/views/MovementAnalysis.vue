<script setup>
import { ElUpload, vLoading } from "element-plus";
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
          <tsbq :top_sellers_by_quantity="top_sellers_by_quantity" />
        </el-tab-pane>
        <el-tab-pane label="Top Sellers By Revenue">
          <tsbr :top_sellers_by_revenue="top_sellers_by_revenue" />
        </el-tab-pane>
      </el-tabs>
      <el-collapse v-if="movement_analysis.tsbq.length > 0">
        <el-collapse-item title="Movement Match">
          <el-tabs type="border-card">
            <el-tab-pane label="Top Sellers By Quantity">
              <MovementMatch :movement_analysis="movement_analysis.tsbq" />
            </el-tab-pane>
            <el-tab-pane label="Top Sellers By Revenue">
              <MovementMatch :movement_analysis="movement_analysis.tsbr" />
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
  <div
    v-if="
      top_sellers_by_quantity.length == 0 && top_sellers_by_revenue.length == 0
    "
    v-loading="loading"
    class="rounded-lg overflow-hidden"
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
.el-upload-dragger {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #179a49;
}
.is-dragover {
  border: 3px solid #179a49 !important;
}
</style>
