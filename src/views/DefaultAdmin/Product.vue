<template>
  <div class="container-fluid">
    <create_product ref="product_modal" />
    <h1 class="text-center mt-5">Products</h1>
    <div class="row">
      <div class="col-12">
        <AppTable :headers="headers" :body="products">
          <template #body_id="{ item }">
            <span>{{ item._id }}</span>
          </template>
          <template #body_edit="{ item }">
            <button class="btn btn-warning" @click="editProduct(item)">
              Edit
            </button>
          </template>
          <template #body_delete="{ item }">
            <button class="btn btn-danger" @click="deleteProd(item)">
              Delete
            </button>
          </template>
        </AppTable>
      </div>
    </div>
    <div class="buttons">
      <button class="btn btn-success" @click="addProduct">Add Product</button
      ><button @click="logout" class="btn btn-success">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import create_product from "@/components/pages/create_product.vue";
import AppTable from "../../components/ui/App-Table.vue";
import { ref } from "vue";
import axios from "../../components/plugins/axios";
import natification from "../../components/plugins/natification";

const router = useRouter();
const products = ref();
const product_modal = ref();

const headers = ref([
  { title: "T/R", value: "id" },
  { title: "Name", value: "name" },
  { title: "Brand", value: "brand" },
  { title: "Group", value: "group" },
  { title: "Price", value: "price" },
  { title: "Arival Price", value: "arrival_price" },
  { title: "Selling Price", value: "selling_price" },
  { title: "Description", value: "description" },
  { title: "Edit", value: "edit" },
  { title: "Delete", value: "delete" },
]);

const getProducts = () => {
  axios
    .get("/api/products")
    .then((res) => {
      products.value = res.data.products;
      console.log(res.data.products);
      natification("Welcome", "success");
    })
    .catch((error) => {
      console.log(error);
    });
};
const addProduct = () => {
  product_modal.value.openModal(products.value, "array");
};
const editProduct = (item) => {
  product_modal.value.openModal(item, "object");
};

const deleteProd = (item) => {
  if (confirm("Вы уверены, что хотите удалить этот продукт?")) {
    axios
      .delete(`/api/users/${item._id}`)
      .then(() => {
        // Удалите пользователя из списка пользователей
        const index = products.value.indexOf(item);
        if (index !== -1) {
          products.value.splice(index, 1);
        }
        natification("User deleted", "success");
      })
      .catch((error) => {
        console.log(error);
        natification("Deleting error", "danger");
      });
  }
};
const logout = () => {
  natification("You have Logged out", "warning");
  localStorage.removeItem("token");
  router.push({ name: "auth" });
};
getProducts();
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  gap: 15px;
}
</style>
