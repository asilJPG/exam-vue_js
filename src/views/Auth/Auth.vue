<template>
  <div class="page">
    <div class="container">
      <div class="left">
        <div class="login">Login</div>
        <div class="eula">
          By logging in you agree to the ridiculously long terms that you didn't
          bother to read
        </div>
      </div>
      <div class="right">
        <svg viewBox="0 0 320 300">
          <defs>
            <linearGradient
              inkscape:collect="always"
              id="linearGradient"
              x1="13"
              y1="193.49992"
              x2="307"
              y2="193.49992"
              gradientUnits="userSpaceOnUse"
            >
              <stop style="stop-color: #ff00ff" offset="0" id="stop876" />
              <stop style="stop-color: #ff0000" offset="1" id="stop878" />
            </linearGradient>
          </defs>
          <path
            d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
          />
        </svg>
        <svg viewBox="0 0 320 300">
          <defs>
            <linearGradient
              inkscape:collect="always"
              id="linearGradient"
              x1="13"
              y1="193.49992"
              x2="307"
              y2="193.49992"
              gradientUnits="userSpaceOnUse"
            >
              <stop style="stop-color: #ff00ff" offset="0" id="stop876" />
              <stop style="stop-color: #ff0000" offset="1" id="stop878" />
            </linearGradient>
          </defs>
          <path
            d="M 40 210 L 320 210"
            stroke="url(#linearGradient)"
            stroke-width="4"
          />
        </svg>
        <div class="form">
          <label for="Username">Name</label>
          <input
            type="text"
            v-model="form.name"
            placeholder="Name"
            class="my-2"
          />
          <label for="password">Password</label>
          <div class="password-input-container">
            <input
              type="password"
              v-model="form.password"
              placeholder="Password"
              class="my-2"
            />

            <div class="password-icon"></div>
          </div>

          <Button
            class=""
            type="submit"
            id="submit"
            value="Submit"
            @click="save"
            >Save</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "../../components/ui/Button.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import $http from "../../components/plugins/axios.js";
const router = useRouter();
const form = ref({
  name: "",
  password: null,
});
const save = () => {
  $http
    .post("/api/admins/login", {
      username: form.value.name,
      password: form.value.password,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        if (res.data.roles == "superadmin") {
          console.log("superAdmin");
          router.push({ name: "users" });
        } else if (res.data.roles == "admin") {
          console.log("admin");
          router.push({ name: "products" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
/////////////
</script>

<style lang="scss" scoped>
// @import url("https://rsms.me/inter/inter-ui.css");
::selection {
  background: #2d2f36;
}
::-webkit-selection {
  background: #2d2f36;
}
::-moz-selection {
  background: #2d2f36;
}
body {
  background: white;
  font-family: "Inter UI", sans-serif;
  margin: 0;
  padding: 20px;
}
.page {
  background: #e2e2e5;
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  position: absolute;
  place-content: center;
  width: calc(100% - 40px);
}
@media (max-width: 767px) {
  .page {
    height: auto;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
.container {
  display: flex;
  height: 320px;
  margin: 0 auto;
  width: 640px;
}
@media (max-width: 767px) {
  .container {
    flex-direction: column;
    height: 630px;
    width: 320px;
  }
}
.left {
  background: white;
  height: calc(100% - 40px);
  top: 20px;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .left {
    height: 100%;
    left: 20px;
    width: calc(100% - 40px);
    max-height: 270px;
  }
}
.login {
  font-size: 50px;
  font-weight: 900;
  margin: 50px 40px 40px;
}
.eula {
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin: 40px;
}
.right {
  background: #474a59;
  box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
  color: #f1f1f2;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .right {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    max-height: 350px;
  }
}
svg {
  position: absolute;
  width: 320px;
}
path {
  fill: none;
  stroke: url(#linearGradient);
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}
.form {
  margin: 40px;
  position: absolute;
  text-align: center;
}
label {
  color: #c2c2c5;
  display: block;
  font-size: 14px;
  height: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
} /* Стили для инпута в обычном состоянии */
input {
  background: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
  padding: 4px;
  border-radius: 3px;
}

/* Стили для инпута при фокусировке (активном состоянии) */
input:focus {
  background: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
}

input::-moz-focus-inner {
  border: 0;
}
#submit {
  color: #707075;
  margin-top: 40px;
  transition: color 300ms;
}
#submit:focus {
  color: #f2f2f2;
}
#submit:active {
  color: #d0d0d2;
}
</style>
