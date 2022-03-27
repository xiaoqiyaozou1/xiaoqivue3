<template>
  <div>
    <div class="header">
      <div class="header-txt">标题：</div>
      <div class="header-input">
        <el-input v-model="addBlog.title" placeholder="请输入标题：" />
      </div>
    </div>
    <md-editor
      style="width: 1500px; height: 800px"
      v-model="addBlog.contentMd"
      preview-theme="vuepress"
      @onUploadImg="onUploadImg"
      @onSave="onSaveMd"
    />
    <div class="container-check">
      <div class="foot-txt">标签：</div>
      <div class="foot-check">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, reactive } from "vue";
import { useStore } from "../store/index";
import { useRouter, useRoute } from "vue-router";
import { getGuid } from "../common/index";
import {
  addBlogContent,
  commitFile,
  baseUrl,
  getBlogDataById,
  editBlogContent,
} from "../api/index";
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
    const route = useRoute();
    const id = ref(route.query.id);
    const isEdit = ref(route.query.isEdit);
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

    const checkArrInfo = computed(() => store.state.blogTagData.blogTagList);
    const checkItems = ref([] as CheckItem[]);
    const checkChange = () => {
      console.log(checkItems);
    };

    const addBlog = reactive({
      id: "",
      title: "",
      userId: "",
      coverImage: null,
      qrcodePath: null,
      isMarkdown: 1,
      content: null,
      contentMd: "",
      top: 0,
      typeId: "",
      status: null,
      recommended: 0,
      original: 1,
      description: null,
      keywords: null,
      comment: 1,
      createTime: "2021-12-24T23:38:32",
      updateTime: "2021-12-24T23:38:32",
    });
    const getBlogContet = async () => {
      const { data } = await getBlogDataById(id.value);
      Object.assign(addBlog, data.response);
      debugger;
      // addBlog.id = data.response.id;
      // addBlog.title = data.response.title;
      // addBlog.userId = data.response.userId;
      // addBlog.coverImage = data.response.coverImage;
      // addBlog.qrcodePath = data.response.qrcodePath;
      // addBlog.isMarkdown = data.response.isMarkdown;
      // addBlog.content = data.response.content;
      // addBlog.contentMd = data.response.contentMd;
      // addBlog.top = data.response.top;
      // addBlog.typeId = data.response.typeId;
      // addBlog.status = data.response.status;
      // addBlog.recommended = data.response.recommended;
      // addBlog.original = data.response.original;
      // addBlog.description = data.response.description;
      // addBlog.keywords = data.response.keywords;
      // addBlog.comment = data.response.comment;
      // addBlog.createTime = data.response.createTime;
      // addBlog.updateTime = data.response.updateTime;
    };
    const onSaveMd = async () => {
      if (isEdit?.value == "true") {
        const { data } = await editBlogContent(addBlog);
        if (data.success) {
          router.push("/blogList");
        } else {
        }
      } else {
        addBlog.id = getGuid();

        addBlog.typeId = checkItems.value
          .map((item) => {
            return item.id;
          })
          .join(";");
        debugger;
        const { data } = await addBlogContent(addBlog);
        if (data.success) {
          router.push("/blogList");
        } else {
          alert(1);
        }
      }
    };
    onMounted(() => {
      getAllTag();
      if (isEdit?.value == "true") {
        getBlogContet();
      }
    });
    return {
      id,
      isEdit,
      mdTitle,
      addBlog,
      checkChange,
      checkItems,
      checkArrInfo,
      onSaveMd,
      onUploadImg,
    };
  },
});
</script>
<style scoped>
.container-check {
  display: flex;
  height: 80px;
}
.foot-check {
  line-height: 80px;
}
.header-input {
  line-height: 80px;
  width: 500px;
}
.foot-txt,
.header-txt {
  line-height: 80px;
  margin-left: 100px;
}
.header {
  display: flex;
  height: 80px;
}
</style>