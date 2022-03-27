<template>
  <div class="my-blog-list">
    <el-card class="box-card" v-for="(item, index) in blogList" :key="index">
      <div class="header">
        <div class="card-header-txt">
          <span>{{ item.title }}</span>
        </div>
        <div class="card-header-btn">
          <el-button
            class="button"
            type="text"
            @click="showBlogContent(item.id)"
            >查看</el-button
          >
          <el-button
            class="button"
            type="text"
            @click="editBlogContent(item.id)"
            >编辑</el-button
          >
          <el-button class="button" type="text" @click="deleteBlogById(item.id)"
            >删除</el-button
          >
        </div>
      </div>
      <!-- <template #header>
        <div class="card-header">
          <span>{{ item.title }}</span>
          <div></div>
        </div>
      </template> -->
      <div class="part-content">
        内容摘要：{{ item.contentMd.substring(0, 50) }}
      </div>
      <div class="create-time">
        {{ item.createTime.substring(0, 10) }}
      </div>
    </el-card>
    <blog-page :pageInfo="pagerInfo" @change="pageChange"></blog-page>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/index";
import { deleteBlog } from "../api/index";
import BlogPage from "../components/BlogPage.vue";

export default defineComponent({
  name: "ColumnList",
  components: {
    BlogPage,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const showBlogContent = (id: string) => {
      router.push({
        name: "blogContent",
        query: {
          id: id,
        },
      });
    };

    const editBlogContent = (id: string) => {
      router.push({
        path: "/blodAdd",
        query: {
          isEdit: "true",
          id: id,
        },
      });
    };

    const pageParams = reactive({
      pageIndex: 1,
      pageSize: 8,
      title: "",
    });
    const pagerInfo = reactive({
      pageIndex: 1,
      pageSize: 8,
      perPages: 5,
      total: 0,
    });

    const getBlogListPage = async () => {
      await store.dispatch("updateBlogList", pageParams);
      pagerInfo.total = store.state.blogData.total;
    };
    onMounted((): void => {
      getBlogListPage();
    });

    const pageChange = async (index: number) => {
      pageParams.pageIndex = index;
      pageParams.title = "";
      await store.dispatch("updateBlogList", pageParams);
    };

    const deleteBlogById = async (id: string) => {
      if (confirm("确定要删除嘛？")) {
        await deleteBlog(id);
        await store.dispatch("updateBlogList", pageParams);
      }
    };
    const blogList = computed(() => store.state.blogData.blogList);
    return {
      blogList,
      showBlogContent,
      editBlogContent,
      getBlogListPage,
      pageParams,
      pagerInfo,
      pageChange,
      deleteBlogById,
    };
  },
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  color: rgb(235, 117, 15);
}
.part-content {
  text-align: left;
}
.create-time {
  text-align: right;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 830px;
  margin-top: 8px;
}

/***************************** */

.xq_alldo {
  list-style: none;
  margin-right: 0px;
}
.xq_do {
  margin-left: 15px;
}
.list-group-item {
  height: 105px;
  text-align: left;
  font-size: 18px;
}

.my-blog-list {
  margin: 0 auto;
  width: 800px;
}
.listTitle {
  font-family: Consolas;
  font-size: 23px;
  color: rgb(83, 41, 98);
  cursor: pointer;
}
.tagContent {
  list-style: none;
  margin-left: 0px;
  margin-right: 30px;
}
.tagContent li {
  float: left;
  margin-inline-end: 8px;
  font-size: 15px;
}
</style>>

