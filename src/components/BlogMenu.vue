<template>
  <ul class="nav nav-tabs myMenu">
    <li
      class="nav-item"
      v-for="item in menuList"
      :key="item.id"
      @click="clickActive(item.id, item.url)"
    >
      <a class="nav-link" :class="item.isActive" aria-current="page" href="#">{{
        item.title
      }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRef } from "vue";
import { useRouter } from "vue-router";
export interface ThemeObj {
  id: string;
  title: string;
  isActive?: string;
  url?: string;
}
export default defineComponent({
  name: "ThemeMenu",
  props: {
    themeMenuList: {
      type: Array as PropType<ThemeObj[]>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    let menuList: ThemeObj[] = reactive(toRef(props, "themeMenuList").value);
    const clickActive = (id: string, url: string) => {
      menuList = menuList.map((o) => {
        if (o.id == id) o.isActive = "active";
        else o.isActive = "false";
        return o;
      });
      router.push({ path: url });
    };
    return {
      menuList,
      clickActive,
    };
  },
});
</script>

<style scoped>
.myMenu {
  width: 500px;
}
</style>