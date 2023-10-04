export default {
  path: "/admin",
  name: "admin",
  component: () => {
    return import("../views/DefaultAdmin/AdminPanel.vue");
  },
  children: [
    {
      path: "/products",
      name: "products",
      component: () => {
        return import("../views/DefaultAdmin/Product.vue");
      },
    },
  ],
};
