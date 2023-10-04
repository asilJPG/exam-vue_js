<template>
  <div class="container-fluid">
    <create_user ref="user_modal" />
    <h1 class="text-center mt-5">Users</h1>
    <div class="row">
      <div class="col-12">
        <AppTable :headers="headers" :body="users">
          <template #body_id="{ item }">
            <span>{{ item._id }}</span>
          </template>
          <template #body_edit="{ item }">
            <button class="btn btn-warning" @click="editUser(item)">
              Edit
            </button>
          </template>
          <template #body_delete="{ item }">
            <button class="btn btn-danger" @click="deleteUser(item)">
              Delete
            </button>
          </template>
        </AppTable>
      </div>
    </div>
  </div>
  <div class="buttons">
    <button id="add" class="btn btn-success" @click="addUser">Add User</button>
    <button @click="logout" class="btn btn-success">Logout</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppTable from "../../components/ui/App-Table.vue";
import axios from "../../components/plugins/axios";
import create_user from "../../components/pages/create_user.vue";
import natification from "../../components/plugins/natification";
import { useRouter } from "vue-router";
const router = useRouter();

const users = ref([]);
const user_modal = ref();

const headers = ref([
  { title: "T/R", value: "id" },
  { title: "Name", value: "name" },
  { title: "Surname", value: "surname" },
  { title: "Age", value: "age" },
  { title: "Is_diploma", value: "is_diploma" },
  { title: "Address", value: "address" },
  { title: "Edit", value: "edit" },
  { title: "Delete", value: "delete" },
]);
const getUsers = () => {
  axios
    .get("/api/users")
    .then((res) => {
      users.value = res.data.users;
      console.log(res.data.users);
      natification("Welcome", "success");
    })
    .catch((error) => {
      console.log(error);
    });
};
const addUser = () => {
  user_modal.value.openModal();
};

const editUser = (item) => {
  user_modal.value.openModal(item, "object");
};
const deleteUser = (item) => {
  if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
    axios
      .delete(`/api/users/${item._id}`)
      .then(() => {
        // Удалите пользователя из списка пользователей
        const index = users.value.indexOf(item);
        if (index !== -1) {
          users.value.splice(index, 1);
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
getUsers();
</script>

<style lang="scss" scoped>
#add {
  margin-left: 10px;
}
.buttons {
  display: flex;
  gap: 15px;
}
</style>
