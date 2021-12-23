<template>
  <div>
    <div class="header">
      <div>标题：</div>
      <div>
        <el-input v-model="mdTitle" placeholder="请输入标题：" />
      </div>
    </div>
    <md-editor
      v-model="contentMd"
      preview-theme="vuepress"
      @onUploadImg="onUploadImg"
      @onSave="onSaveMd"
    />
    <div class="container-check">
      <div>标签：</div>
      <el-checkbox-group
        v-model="checkItems"
        format="changeStyle"
        @change="checkChange"
      >
        <el-checkbox
          v-for="item in checkArrInfo"
          :key="item.id"
          :label="item.name"
          >{{ item.name }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, reactive } from "vue";
import { useStore } from "../store/index";
import { useRouter } from "vue-router";
import { getGuid } from "../common/index";
import { addBlogContent, commitFile, baseUrl } from "../api/index";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

interface CheckItem {
  id: string;
  name: string;
}
export default defineComponent({
  components: { MdEditor },
  setup() {
    const router = useRouter();
    const store = useStore();
    const onUploadImg = async (
      files: FileList,
      callback: (urls: string[]) => void
    ) => {
      const form = new FormData();
      form.append("file", files[0]);
      const { data } = await commitFile(form);
      const urls: string[] = [];
      urls.push(baseUrl + "/" + data?.response);
      callback(urls.map((item: any) => item));
    };

    const getAllTag = async () => {
      await store.dispatch("updateBlogTagList", "");
    };
    const mdTitle = ref("");
    const contentMd = ref("");
    const checkArrInfo = computed(() => store.state.blogTagData.blogTagList);

    const checkItems = ref([] as CheckItem[]);
    const checkChange = () => {
      console.log(checkItems);
    };

    const addBlog = reactive({
      id: "",
      title: "",
      contentMd: "",
      typeId: "",
      userId: "",
    });
    const onSaveMd = async () => {
      addBlog.id = getGuid();
      addBlog.title = mdTitle.value;
      addBlog.typeId = checkItems.value
        .map((item) => {
          return item.id;
        })
        .join(";");
      addBlog.contentMd = contentMd.value;
      const { data } = await addBlogContent(addBlog);
      if (data.success) {
        router.push("/blogList");
      } else {
        alert(1);
      }
    };
    onMounted(() => {
      getAllTag();
    });
    return {
      mdTitle,
      checkChange,
      checkItems,
      checkArrInfo,
      contentMd,
      onSaveMd,
      onUploadImg,
    };
  },
});
</script>
<style scoped>
.container-check {
  display: flex;
}
.header {
  display: flex;
}
</style>