<template>
  <div class="my-blog-list">
    <ul class="list-group">
      <li class="list-group-item" v-for="item in blogList" :key="item.id">
        <p class="listTitle">{{ item.title }}</p>
        <ul class="tagContent">
          <li>创建时间:</li>
          <li>{{ item.createTime.substring(0, 10) }}</li>
        </ul>
        <ul class="tagContent">
          <li>标签:</li>
          <li>{{ item.tag }}</li>
        </ul>
        <ul class="xq_alldo">
          <li>
            <a href="javascript:void(0);" @click="showBlogContent(item.id)">
              点我</a
            >
            <a
              href="javascript:void(0);"
              class="xq_do"
              @click="deleteBlogById(item.id)"
              >删除</a
            >
          </li>
        </ul>
      </li>
    </ul>
    <blog-page :pageInfo="pagerInfo" @change="pageChange"></blog-page>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/index";
import { deleteBlog } from "../api/index";
import BlogPage from "./BlogPage.vue";

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

