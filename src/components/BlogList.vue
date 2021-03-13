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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getBlogDatas } from "../api/index";

export default defineComponent({
  name: "ColumnList",
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
    const getBlogList = async () => {
      const { data } = await getBlogDatas("a");
      blogList.value = data.response.map((o: any) => {
        const newData = {
          id: o.id,
          title: o.title,
          createTime: o.createTime.substring(0, 10),
          tag: "string",
        };
        return newData;
      });
    };
    onMounted((): void => {
      getBlogList();
    });
    return {
      blogList,
      showBlogContent,
      getBlogList,
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

