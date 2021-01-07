import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import MainPage from "../views/MainPage.vue";
import ClassPage from "../views/ClassPage.vue";
import Grades from "../views/Grades.vue";
import {
  publicPath
} from "../../vue.config";

Vue.use(VueRouter);

const routes = [{
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
  },
  {
    path: "/class/:class_name/:subject",
    name: "classPage",
    component: ClassPage
  },
  {
    path: "/class/:class_name/:subject/grades",
    name: "grades",
    component: Grades
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  routes,
  mode: "hash",
  base: publicPath
});

// router.beforeEach((to, from, next) => {
//   document.title = "Mój Dziennik";
//   next();
// });

export default router;