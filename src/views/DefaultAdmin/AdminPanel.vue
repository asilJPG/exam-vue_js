<template>
  <div>
    <section class="sidebar">
      <div class="sidebar_left"><Sidebar :items="sidebar_items" /></div>
      <div class="sidebar_right">
        <!-- <h1>Main</h1> -->
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "../../components/Sidebar.vue";
const sidebar_items = ref([{ id: 1, title: "Products", path: "/products" }]);
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  // width: 100%;
}
.sidebar_left {
  width: 300px;
  height: 100vh;
}
.sidebar_right {
  width: calc(100% - 300px);
}
</style>
