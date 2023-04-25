import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { makeServer } from "./miragejs/server";
import axios from "axios";
import "./assets/tailwind.css";
import "./styles/base.scss";

axios.defaults.baseURL = "http://localhost:3000/api";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      console.log("Não autorizado");
      router.push("/login");
    }
    return Promise.reject(error.response);
  }
);

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

createApp(App).use(store).use(router).mount("#app");
