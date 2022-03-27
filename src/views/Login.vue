<template>
  <div class="login-container">
    <el-card class="box-card">
      <div class="login-txt">测试阶段</div>
      <div class="count-info">
        <div class="conut-txt">账号：</div>
        <div class="count-item-info">
          <el-input v-model="loginInfo.count"></el-input>
        </div>
      </div>
      <div class="count-info">
        <div class="conut-txt">密码：</div>
        <div class="count-item-info">
          <el-input
            v-model="loginInfo.pwd"
            type="password"
            show-password
          ></el-input>
        </div>
      </div>
      <div class="login-btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-card>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive } from "vue";
import { loginBlog } from "../api/index";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const loginInfo = reactive({
      count: "",
      pwd: "",
    });
    const router = useRouter();
    const login = async () => {
      const { data } = await loginBlog(loginInfo.count, loginInfo.pwd);
      if (data.response.success) {
        //将token写入sessionStorage
        window.sessionStorage.setItem(
          "blogToken",
          "Bearer " + data.response.token
        );
        debugger;
        window.sessionStorage.setItem("isLogin", "true");

        router.push("/");
      } else {
        alert("登录失败");
      }
    };
    return {
      loginInfo,
      login,
    };
  },
});
</script>
<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.box-card {
  width: 550px;
  height: 370px;
  margin: auto;
  text-align: center;
}
.login-txt {
  margin-top: 65px;
}
.conut-txt {
  line-height: 40px;
  margin-left: 50px;
}
.count-info {
  display: flex;
  width: 450px;
  margin-top: 10px;
}
.count-item-info {
  flex: 1;
}

.login-btn {
  margin: auto;
  width: 400px;
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}
</style>
