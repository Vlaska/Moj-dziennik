import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: localStorage.getItem("loggedIn") === "true",
    currentPassword: localStorage.getItem("currentPassword") || "Kowalski!23"
  },
  mutations: {
    logIn(state) {
      state.loggedIn = true;
      localStorage.setItem("loggedIn", true);
    },
    logOut(state) {
      state.loggedIn = false;
      localStorage.setItem("loggedIn", false);
    },
    changePassword(state, newPassword) {
      state.currentPassword = newPassword;
      localStorage.setItem("currentPassword", newPassword);
    }
  },
  actions: {},
  modules: {}
});