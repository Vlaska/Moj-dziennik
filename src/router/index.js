import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import MainPage from "../views/MainPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/main",
    name: "mainPage",
    component: MainPage
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

// router.beforeEach((to, from, next) => {
//   document.title = "Mój Dziennik";
//   next();
// });

export default router;
