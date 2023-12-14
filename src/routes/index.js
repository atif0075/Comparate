import { useStore } from "../stores";
import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Home",
    },
    redirect: { name: "PriceComparison" },
    component: () => import("@views/Home.vue"),
    children: [
      {
        path: "price-comparison",
        name: "PriceComparison",
        meta: {
          title: "Price Comparison",
        },
        component: () => import("@views/PriceComparison.vue"),
      },
      {
        path: "movement-analysis",
        name: "MovementAnalysis",
        meta: {
          title: "Movement Analysis",
        },
        component: () => import("@views/MovementAnalysis.vue"),
      },
    ],
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
  const store = useStore(); // Assuming useStore is a function that returns the Vuex store

  // Check if the user is logged in
  if (store.isUser) {
    // If the user is trying to access the login page, redirect to the Home page
    if (to.name === "Login") {
      next({ name: "Home" });
    } else {
      // Allow the navigation to proceed
      next();
    }
  } else {
    // If the user is not logged in and trying to access a page other than the login page, redirect to the login page
    if (to.name !== "Login") {
      next({ name: "Login" });
    } else {
      // Allow the navigation to proceed to the login page
      next();
    }
  }
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Comparate`;
  next();
});

export default router;
