import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css"; // Импорт стилей Bootstrap
import "bootstrap"; // Импорт JavaScript компонентов Bootstrap

createApp(App).use(store).use(router).mount("#app");
