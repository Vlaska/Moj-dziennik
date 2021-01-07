import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import VueTippy, { TippyComponent } from "vue-tippy";
// Odkomentować, gdyby jQuery było potrzebne
global.jQuery = require("jquery");
let $ = global.jQuery;
window.$ = $;

Vue.config.productionTip = false;
Vue.use(Vuelidate);

Vue.mixin({
  methods: {
    class_name(i) {
      return "I".repeat(parseInt(i[0])) + i[1];
    }
  },
  data: () => ({
    subject_codes: {
      jpolski: "Język Polski",
      informatyka: "Informatyka"
    }
  })
});

Vue.use(VueTippy, {
  directive: "tippy", // => v-tippy
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      }
    }
  }
});

Vue.component("tippy", TippyComponent);

function deepIsEqual(first, second) {
  // If first and second are the same type and have the same value
  // Useful if strings or other primitive types are compared
  if (first === second) return true;

  // Try a quick compare by seeing if the length of properties are the same
  let firstProps = Object.getOwnPropertyNames(first);
  let secondProps = Object.getOwnPropertyNames(second);

  // Check different amount of properties
  if (firstProps.length != secondProps.length) return false;

  // Go through properties of first object
  for (var i = 0; i < firstProps.length; i++) {
    let prop = firstProps[i];
    // Check the type of property to perform different comparisons
    switch (typeof first[prop]) {
      // If it is an object, decend for deep compare
      case "object":
        if (!deepIsEqual(first[prop], second[prop])) return false;
        break;
      case "number":
        // with JavaScript NaN != NaN so we need a special check
        if (isNaN(first[prop]) && isNaN(second[prop])) break;
        // eslint-disable-next-line no-fallthrough
      default:
        if (first[prop] != second[prop]) return false;
    }
  }
  return true;
}


Vue.mixin({
  methods: {
    deepIsEqual
  }
});

// eslint-disable-next-line no-unused-vars
let app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");