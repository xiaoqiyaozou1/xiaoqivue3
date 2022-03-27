<template>
  <div class="home">
    <div class="headTop">
      <global-header :personInfo="headerList"></global-header>
    </div>
    <div class="headMenu">
      <blog-menu :themeMenuList="themeMenuList" class="blogmenu"></blog-menu>
    </div>
    <div class="content">
      <div class="contentList">
        <router-view></router-view>
      </div>
    </div>
    <div class="foot">
      <ul>
        <li>
          <a
            href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
            target="_bank"
            >京ICP备2021015486号-1</a
          >
        </li>
        <li>© 2021 小七要走</li>
      </ul>
      <ul>
        <li>Powered by vue3 & .net core 3.1</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
    const nowDate = ref(new Date());

    return {
      headerList: headerDatas,
      themeMenuList: themeMenuDatas,
      nowDate,
    };
  },
});
</script>

<style scoped>
.left-card {
  margin-left: 15px;
}
.right-card {
  margin-right: 15px;
}
.date-calendar {
  height: 360px;
  width: 500px;
  margin-top: 10px;
}
.date-calendar /deep/ .el-calendar-table .el-calendar-day {
  width: 50px;
  height: 35px;
}

.home {
  width: 100%;
  height: 100%;
  margin-left: 0px;
  margin-right: 0px;
}
.headTop {
  height: 5rem;
  margin: 0.625rem;
  text-align: center;
}
.titleImage {
  margin: 0 auto;
  width: 34.375rem;
  height: 100%;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
}
.headMenu {
  height: 3.75rem;
  border: red;
  width: 100%;
  text-align: left;
  /* background-color:rosybrown;
	*/
  box-shadow: -0.25rem -0.25rem 0.625rem -0.5rem rgba(255, 255, 255, 1),
    0.25rem 0.25rem 0.625rem -0.5rem rgba(0, 0, 0, 0.3);
}
.content {
  display: flex;
}
.contentList {
  width: 100%;
}
.contentRight {
  width: 300px;
  /* background-color: burlywood; */
}
.foot li {
  list-style: none;
  display: inline;
}
.foot ul {
  display: block;
  margin: 0 0 0 0;
}
.foot {
  width: 100%;
  height: 50px;
  text-align: center;
}
.blogmenu {
  margin: 0 auto 0 5rem;
}
</style>>

