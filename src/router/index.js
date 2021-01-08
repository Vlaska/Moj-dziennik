import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import TwoStepVer from "../views/TwoStepVer.vue";
import MainPage from "../views/MainPage.vue";
import ClassPage from "../views/ClassPage.vue";
import Grades from "../views/Grades.vue";

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
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/login/2sv",
    name: "2sv",
    component: TwoStepVer
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

const LOGIN_REQUIRED = {
  mainPage: true,
  classPage: true,
  grades: true
};

const router = new VueRouter({
  routes,
  mode: "hash"
});

router.beforeEach((to, from, next) => {
  if (LOGIN_REQUIRED[to.name] && localStorage.getItem("loggedIn") !== "true") {
    next({
      name: "login"
    })
  } else {
    next();
  }
});

export default router;