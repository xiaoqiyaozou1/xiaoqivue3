<template>
  <div id="main">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">标题</label>
      <input type="email" class="form-control" v-model="blogContent.title" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">内容</label>
      <textarea
        class="form-control"
        rows="20"
        v-model="blogContent.contentMd"
      ></textarea>
    </div>
    <div class="container-check">
      <div class="form-check" v-for="item in checkArrInfo" :key="item.id">
        <input
          class="form-check-input"
          type="checkbox"
          :value="item.id"
          :id="item.id"
          v-model="checkedInfo"
        />
        <label class="form-check-label" :for="item.id">
          {{ item.name }}
        </label>
      </div>
      {{ checkedInfo.join(",") }}
    </div>

    <div class="mb-3">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        @click="commitData"
      >
        保存
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
      >
        取消
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { addBlogContent, getTags } from "../api/index";
import { getGuid } from "../common/index";

export default defineComponent({
  name: "blogAdd",
  setup() {
    const router = useRouter();
    const blogContent = ref({
      id: "",
      title: "",
      contentMd: "",
      typeId: "",
      userId: "",
    });
    const commitData = async () => {
      blogContent.value.id = getGuid();
      blogContent.value.typeId = getGuid();
      blogContent.value.userId = getGuid();
      const { data } = await addBlogContent(blogContent.value);
      if (data.success) {
        router.push("/blogList");
      }
    };

    const checkArrInfo = ref([]);
    const getAllTag = async () => {
      const { data } = await getTags("");
      checkArrInfo.value = data.response;
    };
    onMounted((): void => {
      getAllTag();
    });
    const checkedInfo = ref([]);
    return {
      blogContent,
      commitData,
      checkArrInfo,
      checkedInfo,
      getAllTag,
    };
  },
});
</script>

<style scope>
.container-check {
  display: flex;
  width: 100%;
  border: 1px dashed burlywood;
}
.container-check .form-check {
  margin-left: 20px;
  padding-bottom: 20px;
}
</style>