<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" v-if="prevMoreShow">...</a>
      </li>
      <li class="page-item" v-for="item in pagers" :key="item">
        <a class="page-link" href="#" @click="goPage(item)">{{ item }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" v-if="nextMoreShow">...</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click="nextPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, toRefs, computed } from "vue";

export interface PageInfo {
  total: number; //总数量
  pageSize: number; //每页展示条数
  pageIndex: number;
  perPages: number; //展示的页数
}
export default defineComponent({
  name: "BlogPage",
  props: {
    pageInfo: {
      type: Object as PropType<PageInfo>,
      required: true,
    },
  },
  setup(props, context) {
    const { pageInfo } = toRefs(props);
    const currentIndex = ref(1);
    const pages = computed(() => {
      return Math.ceil(pageInfo.value.total / pageInfo.value.pageSize);
    });
    const prevMoreShow = ref(false);
    const nextMoreShow = ref(false);
    const pagers = computed(() => {
      const perPages = pageInfo.value.perPages;
      const pageCount = pages.value;
      const _offset = (perPages - 1) / 2;
      const offset = {
        start: currentIndex.value - _offset,
        end: currentIndex.value + _offset,
      };
      if (offset.start < 1) {
        offset.end = offset.end + (1 - offset.start);
        offset.start = 1;
      }
      if (offset.end > pageCount) {
        offset.start = offset.start - (offset.end - pageCount);
        offset.end = pageCount;
      }
      if (offset.start < 1) offset.start = 1;

      // prevMoreShow.value = offset.start > 1;
      // nextMoreShow.value = offset.end < pageCount;
      const array = [];

      for (let i = offset.start; i <= offset.end; i++) {
        array.push(i);
      }

      return array;
    });

    const goPage = (index: any) => {
      context.emit("change", index);
    };
    const prevPage = () => {
      if (currentIndex.value != 1) goPage(currentIndex.value - 1);
    };
    const nextPage = () => {
      if (currentIndex.value < pages.value) goPage(currentIndex.value + 1);
    };
    return {
      prevMoreShow,
      nextMoreShow,
      currentIndex,
      pages,
      pagers,
      goPage,
      prevPage,
      nextPage,
    };
  },
});
</script>

<style>
</style>