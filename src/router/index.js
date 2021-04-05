import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "landing",
    component: () => import("../views/LandingScreen"),
    children: [
      {
        path: "/",
        component: () => import("../views/HomeScreen"),
        children: [
          {
            path: "/",
            name: "home",
            component: () => import("../views/Selection"),
          },
          {
            path: "/lobby",
            name: "lobby",
            component: () => import("../views/Lobby"),
          },
        ],
      },
      {
        path: "/ingame",
        name: "ingame",
        component: () => import("../views/IngameScreen"),
      },
      {
        path: "assignments",
        name: "assignments",
        component: () => import("../views/Assignments"),
      },
      {
        path: "/themes",
        name: "themes",
        component: () => import("../views/ThemeScreen"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginScreen.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
