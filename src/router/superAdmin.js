export default {
  path: "/superAdmin",
  name: "superAdmin",
  component: () => {
    return import("../views/SuperAdmin/SuperAdmin.vue");
  },
  children: [
    {
      path: "/users",
      name: "users",
      component: () => {
        return import("../views/SuperAdmin/Users.vue");
      },
    },
  ],
};
