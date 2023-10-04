<template>
  <div>
    <AppModal v-model="dialog">
      <h1>Create User</h1>
      <form>
        <input
          type="text"
          v-model="forms.name"
          class="form-control my-2"
          placeholder="Name"
        />
        <input
          type="text"
          v-model="forms.surname"
          class="form-control my-2"
          placeholder="Surname"
        />
        <input
          type="number"
          v-model="forms.age"
          class="form-control my-2"
          placeholder="Age"
        />
        <input
          type="text"
          v-model="forms.is_diploma"
          class="form-control my-2"
          placeholder="Is Diploma"
        />
        <input
          type="text"
          v-model="forms.address"
          class="form-control my-2"
          placeholder="Address"
        />
        <button class="btn btn-success" @click="save_form">Save</button>
      </form>
    </AppModal>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import natification from "../plugins/natification";
import AppModal from "../ui/app-modal.vue";
import axios from "../../components/plugins/axios";

const dialog = ref(false);
const forms = ref({
  name: "",
  surname: "",
  age: 0,
  is_diploma: false,
  address: "",
});
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

// const openModal = (value, title) => {
//   if (title == "array") {
//     users.value = value;
//   } else if (title == "objet") {
//     forms.value = { ...value };
//   }
//   dialog.value = true;
// };
const openModal = (value) => {
  if (value) forms.value = { ...value };
  dialog.value = true;
};
const save_form = (e) => {
  e.preventDefault();
  try {
    if (!forms.value._id) {
      axios
        .post("/api/users/add", {
          name: forms.value.name,
          surname: forms.value.surname,
          age: forms.value.age,
          is_diploma: forms.value.is_diploma,
          address: forms.value.address,
        })
        .then((res) => {
          console.log("create");
          console.log(res);
          natification("User created", "success");
        });
    } else {
      console.log(forms.value._id),
        axios
          .patch(`/api/users/update/${forms.value._id}`, {
            name: forms.value.name,
            surname: forms.value.surname,
            age: forms.value.age,
            is_diploma: forms.value.is_diploma,
            address: forms.value.address,
          })
          .then((res) => {
            console.log(res);
            console.log(forms.value._id);
            natification("User edited", "success");
          });
    }
    dialog.value = false;
  } catch (err) {
    console.log(err);
  }
};
defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
