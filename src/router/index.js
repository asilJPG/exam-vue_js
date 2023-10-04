// main.js
import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import admin from "./admin";
import superAdmin from "./superAdmin";

const routes = [auth, admin, superAdmin];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  const name = to.name === "auth";
  if (!token && !name) {
    next({ name: "auth" });
  } else {
    if (token && name) {
      next({ name: "admin" });
    } else {
      next();
    }
  }
});

export default router;
