<template>
  <AppModal v-model="dialog">
    <h1>Creaate Product</h1>
    <form action="">
      <input
        type="text"
        v-model="forms.name"
        class="form-control my-2"
        placeholder="Name"
      />
      <input
        type="text"
        v-model="forms.brand"
        class="form-control my-2"
        placeholder="Brand"
      />
      <input
        type="text"
        v-model="forms.group"
        class="form-control my-2"
        placeholder="Group"
      />
      <input
        type="text"
        v-model="forms.price"
        class="form-control my-2"
        placeholder="Price"
      />
      <input
        type="text"
        v-model="forms.arrival_price"
        class="form-control my-2"
        placeholder="Arival price"
      />

      <input
        type="text"
        v-model="forms.selling_price"
        class="form-control my-2"
        placeholder="Selling price"
      />

      <textarea
        v-model="forms.desc"
        cols="30"
        rows="10"
        class="form-control my-2"
        placeholder="Description"
      ></textarea>
      <button class="btn btn-success" @click="save_form">Save</button>
    </form>
  </AppModal>
</template>

<script setup>
import AppModal from "../ui/app-modal.vue";
import { ref, watch } from "vue";
import natification from "../plugins/natification";
import axios from "../../components/plugins/axios";
const dialog = ref(false);
const forms = ref({
  name: "",
  brand: "",
  group: "",
  price: 0,
  arrival_price: 0,
  selling_price: 0,
  description: "",
});
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});
const products = ref([]);
const openModal = (value) => {
  if (value) forms.value = { ...value };
  dialog.value = true;
};
const save_form = (e) => {
  e.preventDefault();
  try {
    if (!forms.value.id) {
      axios
        .post("/api/products/add", {
          name: forms.value.name,
          brand: forms.value.brand,
          group: forms.value.group,
          price: forms.value.price,
          arrival_price: forms.value.arrival_price,
          selling_price: forms.value.selling_price,
          description: forms.value.description,
        })
        .then((res) => {
          natification("Product created", "success");
          console.log(res);
        });
    } else {
      axios
        .patch(`/api/products/update${forms.value._id}`, {
          name: forms.value.name,
          brand: forms.value.brand,
          group: forms.value.group,
          price: forms.value.price,
          arrival_price: forms.value.arrival_price,
          selling_price: forms.value.selling_price,
          description: forms.value.description,
        })
        .then((res) => {
          console.log(res);
          natification("Product edited", "success");
        });
    }
    dialog.value = false;
  } catch (err) {
    console.log(err);
    natification("Error", "danger");
  }
};
defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
