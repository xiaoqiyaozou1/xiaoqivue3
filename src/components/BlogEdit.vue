<template>
  <div id="main">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">标题</label>
      <input type="email" class="form-control" v-model="editData.title" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">内容</label>
      <textarea
        class="form-control"
        rows="20"
        v-model="editData.contentMd"
      ></textarea>
    </div>
    <div class="mb-3">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        @click="commitEditData(editData)"
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

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getBlogDataById, editBlogContent } from "../api/index";
export default defineComponent({
  name: "BlogEdit",
  setup() {
    const router = useRouter();
    const commitEditData = async (editData: any) => {
      const { data } = await editBlogContent(editData);
      if (data.success) {
        router.push("/blogList");
      }
    };

    const route = useRoute();
    const editData = ref([]);
    const getEditBlog = async () => {
      const id: any = route.query.id;
      const { data } = await getBlogDataById(id);
      if (data.success) editData.value = data.response;
    };
    onMounted((): void => {
      getEditBlog();
    });

    return {
      editData,
      getEditBlog,
      commitEditData,
    };
  },
});
</script>