<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";

export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
