<template>
  <div class="sidebar">
    <router-link
      class="sidebar_link"
      :to="item.path"
      v-for="(item, index) in items"
      :key="index"
    >
      {{ item.title }}
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  min-height: 120vh;
  background-color: #000016;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .sidebar_link {
    width: 100%;
    padding: 10px 15px;
    text-decoration: none;
    border-radius: 5px;
    background-color: #fff;
    color: #000016;
  }
  .sidebar_link:hover {
    background-color: #525274;
    transition: 1s;
  }
}
</style>
