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

// router.beforeEach((to, from, next) => {
//   const store = useStore();
//   if (store.isUser) {
//     if (to.name === "Login" || to.name === "Register" || to.name === "Home") {
//       if (store.userDetails.userType === "customer") {
//         return next("/customer/home");
//       } else if (store.userDetails.userType === "seller") {
//         return next("/seller/home");
//       }
//     }
//   }

//   // Check if the route requires authentication
//   if (to.meta.requireAuth) {
//     // Check if the user is logged in
//     if (!store.isUser) {
//       // Redirect to the login page if not logged in
//       return next("/auth/login");
//     }

//     // Check if the user has the required role
//     if (to.meta.role && store.userDetails.userType !== to.meta.role) {
//       // Redirect to the appropriate page based on the user's role
//       if (store.userDetails.userType === "customer") {
//         return next("/customer/home");
//       } else if (store.userDetails.userType === "seller") {
//         return next("/seller/home");
//       }
//     }
//   }

//   // Continue to the next route
//   next();
// });

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Comparate`;
  next();
});

export default router;
