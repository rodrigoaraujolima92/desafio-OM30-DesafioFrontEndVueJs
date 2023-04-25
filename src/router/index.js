import { createRouter, createWebHistory } from "vue-router";
import LoginVue from "@/views/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginVue,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard/dashBase.vue"),
    children: [
      {
        path: "pacientes",
        name: "pacientes",
        component: () => import("@/views/dashboard/pacientes/Pacientes.vue"),
      },
      {
        path: "perfil",
        name: "perfil",
        component: () => import("@/views/dashboard/perfil/perfil.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
