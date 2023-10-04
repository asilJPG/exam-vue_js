import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const natification = (text, type) => {
  createToast(text, {
    position: "top-right",
    type: type,
    transition: "slide",
    timeout: 3000,
  });
};
export default natification;
