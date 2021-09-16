<template>
  <div id="main">
    <div class="mb-3 title_p">
      <label for="exampleFormControlInput1" class="form-label">标题</label>
      <input type="email" class="form-control" v-model="blogContent.title" />
    </div>
    <div class="mb-3 title_p">
      <label for="exampleFormControlTextarea1" class="form-label">内容</label>
      <ul class="nav">
        <li class="nav-item">
          <a
            class="nav-link active"
            aria-current="page"
            href="#"
            @click="handerFileClick"
            >添加图片</a
          >
        </li>
      </ul>
      <input type="file" ref="inputFile" hidden @change="fileHanderChange" />
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
import { ref, onMounted, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { addBlogContent, getTags, commitFile, baseUrl } from "../api/index";
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

    const inputFile = ref<null | HTMLInputElement>(null);

    const handerFileClick = () => {
      inputFile.value?.click();
    };

    const fileHanderChange = async (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      if (currentTarget.files) {
        const formData = new FormData();
        formData.append("file", currentTarget.files[0]);
        debugger;
        const { data } = await commitFile(formData);
        const fileGuid = data.response;
        const imageMd = "![imgage](" + baseUrl + "/" + fileGuid + "=700*300)";
        blogContent.value.contentMd += imageMd;
      }
    };

    return {
      blogContent,
      commitData,
      checkArrInfo,
      checkedInfo,
      getAllTag,
      handerFileClick,
      inputFile,
      fileHanderChange,
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

img {
  width: 480px;
  height: 100%;
}
.title_p {
  text-align: left;
}
</style>