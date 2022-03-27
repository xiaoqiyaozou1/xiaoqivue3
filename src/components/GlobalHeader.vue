<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ personInfo.name }}</a>
    </div>
    <el-button @click="goLoginPage"> {{ loginStatus }}</el-button>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
export interface UserLogin {
  isLogin: boolean;
  name?: string;
  id?: string;
}

import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "GlobalHeader",
  props: {
    personInfo: {
      type: Object as PropType<UserLogin>,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const loginStatus = ref("登录");
    const router = useRouter();
    const goLoginPage = () => {
      const isLogin = window.sessionStorage.getItem("isLogin");
      if (isLogin === "true") {
        window.sessionStorage.removeItem("isLogin");
        window.sessionStorage.removeItem("blogToken");
        loginStatus.value = "登录";
        ElMessage({
          message: "退出成功！",
          type: "success",
        });
      } else {
        router.push("/Login");
      }
    };

    onMounted(() => {
      const isLogin = window.sessionStorage.getItem("isLogin");
      if (isLogin === "true") {
        loginStatus.value = "退出";
      } else {
        loginStatus.value = "登录";
      }
    });
    return {
      isOpen,
      toggleOpen,

      goLoginPage,
      loginStatus,
    };
  },
});
</script>

<style>
.xiaoqi-bg:hover,
.xiaoqi-bg:active,
.xiaoqi-bg {
  width: 150px;
  background-color: cornflowerblue;
}
</style>