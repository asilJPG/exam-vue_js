<template>
  <div class="table1">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th v-for="(item, index) in headers" :key="index" scope="col">
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in body" :key="index">
          <td v-for="(bodyInHeader, bodyInIndex) in headers" :key="bodyInIndex">
            <slot :name="`body_${bodyInHeader.value}`" :item="item">{{
              item[bodyInHeader.value]
            }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  headers: {
    type: Array,
  },
  body: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped></style>
