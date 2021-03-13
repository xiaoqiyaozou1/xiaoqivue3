<template>
  <div class="home">
    <div class="headTop">
      <global-header :personInfo="headerList"></global-header>
    </div>
    <div class="headMenu">
      <blog-menu :themeMenuList="themeMenuList"></blog-menu>
    </div>
    <div class="content">
      <div class="contentList">
        <router-view></router-view>
      </div>

      <div class="contentRight"></div>
    </div>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2021 小七要走</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">哈哈</li>
          <li class="list-inline-item">66</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GlobalHeader, { UserLogin } from "../components/GlobalHeader.vue";
import BlogMenu, { ThemeObj } from "../components/BlogMenu.vue";

//表头数据
const headerDatas: UserLogin = {
  id: "aaa",
  isLogin: true,
  name: "小七的博客",
};

//menu 菜单
const themeMenuDatas: ThemeObj[] = [
  {
    id: "ccc",
    title: "首页",
    isActive: "active",
    url: "/blogList",
  },
  {
    id: "aa",
    title: "专题",
    isActive: "false",
    url: "/",
  },
  {
    id: "qq",
    title: "新笔记",
    isActive: "false",
    url: "/blodAdd",
  },
];
export default defineComponent({
  name: "home",
  components: {
    GlobalHeader,
    BlogMenu,
  },
  setup() {
    return {
      headerList: headerDatas,
      themeMenuList: themeMenuDatas,
    };
  },
});
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  margin-left: 0px;
  margin-right: 0px;
}
.headTop {
  height: 70px;
}
.headMenu {
  height: 60px;
}
.content {
  display: flex;
  height: 100%;
}
.contentList {
  width: 100%;
}
.contentRight {
  width: 300px;
  background-color: burlywood;
}
.footer {
  width: 100%;
  height: 50px;
}
</style>>

