<template>
  <div class="home">
    <div class="headTop">
      <global-header :personInfo="headerList"></global-header>
      <div>
        <img class="titleImage" src="../assets/title.webp" />
      </div>
    </div>
    <div class="headMenu">
      <blog-menu :themeMenuList="themeMenuList" class="blogmenu"></blog-menu>
    </div>
    <div class="content">
      <div class="contentList">
        <router-view></router-view>
      </div>
      <!-- 
      <div class="contentRight"></div> -->
    </div>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">
            <a
              href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
              target="_bank"
            >
              京ICP备2021015486号-1</a
            >
          </li>
          <li class="list-inline-item">© 2021 小七要走</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">哈哈</li>
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
  // {
  //   id: "aa",
  //   title: "专题",
  //   isActive: "false",
  //   url: "/",
  // },
  // {
  //   id: "qq",
  //   title: "新笔记",
  //   isActive: "false",
  //   url: "/blodAdd",
  // },
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
  height: 400px;
  margin: 10px;
  text-align: center;
}
.titleImage {
  margin: 0 auto;
  width: 550px;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.headMenu {
  height: 60px;
  border: red;
  width: 100%;
  text-align: center;

  /* background-color: rosybrown; */
  box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1),
    4px 4px 10px -8px rgba(0, 0, 0, 0.3);
}
.content {
  display: flex;
  height: 100%;
}
.contentList {
  width: 100%;
  text-align: center;
}
.contentRight {
  width: 300px;
  /* background-color: burlywood; */
}
.footer {
  width: 100%;
  height: 50px;
}
.blogmenu {
  margin: 0 auto;
}
</style>>

