import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

// eslint-disable-next-line no-unused-vars
let app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
