<template>
  <div>
    <h>{{ blogContent.title }}</h>
    <div v-html="blogContent.html"></div>
    <!-- <div class="mb-3">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        @click="editData(blogContent.id)"
      >
        编辑
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
      >
        取消
      </button>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import { useRouter, useRoute } from "vue-router";
import { getBlogDataById } from "../api/index";
import markdown from "markdown-it";

export default defineComponent({
  name: "BlogContent",
  setup() {
    const router = useRouter();
    const editData = (id: any) => {
      router.push({ name: "blogEdit", query: { id: id } });
    };

    const md = new markdown({
      html: true,
      linkify: true,
      typographer: true,
    });
    const blogContent = ref({
      id: "",
      title: "",
      html: "",
    });
    const route = useRoute();
    const id = ref(route.query.id);
    const getBlogContet = async () => {
      const { data } = await getBlogDataById(id.value);
      blogContent.value.id = data.response.id;
      blogContent.value.title = data.response.title;
      blogContent.value.html = md.render(data.response.contentMd);
      debugger;
    };
    onMounted((): void => {
      getBlogContet();
    });
    return {
      editData,
      blogContent,
      getBlogContet,
    };
  },
});
</script>

<style scope>
img {
  width: 480px;
  height: 100%;
}
</style>