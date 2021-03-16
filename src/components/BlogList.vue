<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="item in blogList"
      :key="item.id"
      @click="showBlogContent(item.id)"
    >
      <p>{{ item.title }}</p>
      <span class="tagContent"
        >创建时间:{{ item.createTime }}, 标签:{{ item.tag }}</span
      >
    </li>
  </ul>
  <blog-page :pageInfo="pagerInfo" @change="pageChange"></blog-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getBlogDatas, getBlogDataPage } from "../api/index";

import BlogPage from "./BlogPage.vue";

export default defineComponent({
  name: "ColumnList",
  components: {
    BlogPage,
  },
  setup() {
    const router = useRouter();
    const showBlogContent = (id: string) => {
      router.push({
        name: "blogContent",
        query: {
          id: id,
        },
      });
    };

    const blogList = ref([]);
    // const getBlogList = async () => {
    //   const { data } = await getBlogDatas("a");
    //   blogList.value = data.response.map((o: any) => {
    //     const newData = {
    //       id: o.id,
    //       title: o.title,
    //       createTime: o.createTime.substring(0, 10),
    //       tag: "string",
    //     };
    //     return newData;
    //   });
    // };
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
      const { data } = await getBlogDataPage(pageParams);

      blogList.value = data.response.data.map((o: any) => {
        const newData = {
          id: o.id,
          title: o.title,
          createTime: o.createTime.substring(0, 10),
          tag: "string",
        };
        return newData;
      });
      pagerInfo.total = data.response.total;
    };
    onMounted((): void => {
      getBlogListPage();
    });

    const pageChange = async (index: any) => {
      pageParams.pageIndex = index;
      pageParams.title = "";
      const { data } = await getBlogDataPage(pageParams);
      pagerInfo.pageIndex = index;

      pagerInfo.total = data.response.total;

      blogList.value = data.response.data.map((o: any) => {
        const newData = {
          id: o.id,
          title: o.title,
          createTime: o.createTime.substring(0, 10),
          tag: "string",
        };
        return newData;
      });
    };
    return {
      blogList,
      showBlogContent,
      getBlogListPage,
      pageParams,
      pagerInfo,
      pageChange,
    };
  },
});
</script>

<style scoped>
.list-group-item {
  text-align: left;
  font-size: 15px;
}
.tagContent {
  font-size: 8px;
}
</style>>

