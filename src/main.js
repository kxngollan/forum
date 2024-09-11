import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./styles.css";

import App from "./App.vue";
import Home from "./pages/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
