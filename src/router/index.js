import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import TwoStepVer from "../views/TwoStepVer.vue";
import ResetPassword from "../views/ResetPassword.vue";
import ResetPasswordEmail from "../views/ResetPasswordEmail.vue";
import MainPage from "../views/MainPage.vue";
import ClassPage from "../views/ClassPage.vue";
import Grades from "../views/Grades.vue";
import Notes from "../views/Notes.vue";
import {
  class_name,
  subject_codes
} from "../main";

function getClassName(path) {
  return `Klasa ${class_name(path.class_name)} — ${subject_codes[path.subject]}`;
}

function getClassLinkWithName(path, name) {
  return {
    name,
    params: {
      class_name: path.class_name,
      subjcet: path.subject
    }
  };
}

// eslint-disable-next-line no-unused-vars
function getGradeLink(path) {
  return getClassLinkWithName(path, "grades");
}

function getClassLink(path) {
  return getClassLinkWithName(path, "classPage");
}

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      breadCrumbs: []
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      breadCrumbs: [{
        name: "Logowanie"
      }]
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
    meta: {
      breadCrumbs: [{
        name: "Wylogowano"
      }]
    }
  },
  {
    path: "/login/2sv",
    name: "2sv",
    component: TwoStepVer,
    meta: {
      breadCrumbs: [{
          name: "Logowanie",
          link: "login"
        },
        {
          name: "Weryfikacja dwuetapowa"
        }
      ]
    }
  },
  {
    path: "/login/reset",
    name: "resetPassword",
    component: ResetPassword,
    meta: {
      breadCrumbs: [{
          name: "Logowanie",
          link: "login"
        },
        {
          name: "Resetowanie hasła"
        }
      ]
    }
  },
  {
    path: "/login/reset/email",
    name: "resetPasswordEmail",
    component: ResetPasswordEmail,
    meta: {
      breadCrumbs: []
    }
  },
  {
    path: "/main",
    name: "mainPage",
    component: MainPage,
    meta: {
      breadCrumbs: [],
      loginRequired: []
    }
  },
  {
    path: "/class/:class_name/:subject",
    name: "classPage",
    component: ClassPage,
    meta: {
      breadCrumbs: [{
        name: getClassName,
        func: true
      }],
      loginRequired: true
    }
  },
  {
    path: "/class/:class_name/:subject/grades",
    name: "grades",
    component: Grades,
    meta: {
      breadCrumbs: [{
          name: getClassName,
          link: getClassLink,
          func: true
        },
        {
          name: "Oceny"
        }
      ],
      loginRequired: true
    }
  },
  {
    path: "/notes/:class_name?",
    name: "notes",
    component: Notes,
    meta: {
      breadCrumbs: [{
        name: "Uwagi"
      }],
      loginRequired: true
    }
  },
  {
    path: "*",
    redirect: "/",
    meta: {
      breadCrumbs: []
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "hash"
});

router.beforeEach((to, from, next) => {
  if (to.meta.loginRequired && localStorage.getItem("loggedIn") !== "true") {
    next({
      name: "login"
    })
  } else {
    next();
  }
});

export default router;