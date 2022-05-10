import Vue from "vue";
import VueRouter from "vue-router";
import Stock from "../pages/stock/Stock.vue";
import Substock from "../pages/substock/Substock.vue";
import Products from "../pages/products/Products.vue";
import Orders from "../pages/orders/Orders";
import Login from "../pages/auth/Login";
import store from "@/store";
import DashboardLayout from "../layout/DashboardLayout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      roles: ["admin"],
    },
    children: [
      {
        path: "/categories",
        name: "categories",
        component: Stock,
        meta: {
          requiresAuth: true,
          roles: ["admin"],
        },
      },
      {
        path: "/sous-categories",
        name: "sous-categories",
        component: Substock,
        meta: {
          requiresAuth: true,
          roles: ["admin"],
        },
      },
      {
        path: "/products",
        name: "products",
        component: Products,
        meta: {
          requiresAuth: true,
          roles: ["admin"],
        },
      },
      {
        path: "/orders",
        name: "orders",
        component: Orders,
        meta: {
          requiresAuth: true,
          roles: ["admin"],
        },
      },
      {
        path: "/logout",
        name: "logout",
        meta: {
          requiresAuth: true,
          roles: ["admin"],
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to.name);
  if (to.meta?.requiresAuth) {
    if (store.state.auth.isAuthenticated) {
      if (to.meta?.roles?.includes(store.state.auth.user.type)) {
        console.log("admin and auth ok");
        next();
      } else {
        console.log("auth but not admin");
        next("/");
      }
    } else {
      console.log("not auth");
      next("/");
    }
  } else {
    //not requiresAuth;
    console.log("auth not required free access ");
    console.log(store.state.auth.isAuthenticated);

    if (store.state.auth.isAuthenticated) {
      // if connected could'nt come here to connect again
      next("/products");
    }

    next();
  }
});

export default router;
