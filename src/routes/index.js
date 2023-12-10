import { useStore } from "../stores";
import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Home",
    },
    component: () => import("@views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "Login",
    },
    component: () => import("@views/Login.vue"),
  },
  //   404 Page
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      title: "404 Not Found",
    },
    component: () => import("@views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  if (store.isUser) {
    if (to.name === "Login") {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    if (to.name === "Login") {
      next();
    } else {
      next({ name: "Login" });
    }
  }
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Comparate`;
  next();
});

export default router;
