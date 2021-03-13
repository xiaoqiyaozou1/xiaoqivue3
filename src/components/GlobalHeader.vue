<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ personInfo.name }}</a>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle xiaoqi-bg"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          @click="toggleOpen"
        >
          小七
        </button>
        <ul
          class="dropdown-menu"
          :style="{ display: 'block' }"
          v-if="isOpen"
          aria-labelledby="dropdownMenuButton1"
        >
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
export interface UserLogin {
  isLogin: boolean;
  name?: string;
  id?: string;
}
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
    return {
      isOpen,
      toggleOpen,
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