<template>
  <div class="container">
    <h2>{{ blogContent.title }}</h2>
    <div>
      <md-editor
        style="width: 1500px; height: 800px"
        v-model="blogContent.contentMd"
        preview-theme="vuepress"
        :previewOnly="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";

import { useRouter, useRoute } from "vue-router";
import { getBlogDataById } from "../api/index";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default defineComponent({
  name: "BlogContent",
  components: { MdEditor },
  setup() {
    const router = useRouter();
    const editData = (id: any) => {
      router.push({ name: "blogEdit", query: { id: id } });
    };

    const blogContent = reactive({
      title: "",
      contentMd: "",
    });
    const route = useRoute();
    const id = ref(route.query.id);
    const getBlogContet = async () => {
      const { data } = await getBlogDataById(id.value);
      Object.assign(blogContent, data.response);
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
.container {
  text-align: left;
}
img {
  width: 480px;
  height: 100%;
}
</style>