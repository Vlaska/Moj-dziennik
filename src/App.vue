<template>
  <v-app>
    <v-app-bar app="" color="indigo darken-1" dark>
      <div class="d-flex align-center">
        <ul class="breadcrumbs">
          <li>
            <h2>
              <router-link
                :to="{ name: 'Home' }"
                style="color: inherit; text-decoration: inherit"
                >Mój Dziennik</router-link
              >
            </h2>
          </li>
          <li v-for="item in path" :key="item.name">
            <router-link v-if="item.disabled !== $route.path" :to="item.link">{{
              item.name
            }}</router-link>
            <span v-else>{{ item.name }}</span>
          </li>
        </ul>
        <!-- <v-breadcrumbs divider="/" :items="path">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              :to="{ name: item.link }"
            >
              <span style="color: rgb(229, 229, 229)">{{ item.name }}</span>
            </v-breadcrumbs-item>
          </template>
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs> -->
      </div>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'login' }" v-if="!loggedIn()">
        <v-btn color="indigo darken-3">Zaloguj</v-btn>
      </router-link>
      <div class="d-flex align-center" v-else>
        <span
          >Witaj: <span class="font-weight-bold mr-5">Jan Kowalski</span></span
        >
        <router-link :to="{ name: 'logout' }">
          <v-btn color="indigo darken-3">Wyloguj</v-btn>
        </router-link>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
require("tippy.js/themes/light.css");
require("tippy.js/themes/light-border.css");
require("tippy.js/themes/google.css");
require("tippy.js/themes/translucent.css");
document.title = "Mój Dziennik";
export default {
  name: "App",

  // components: {
  //   HelloWorld
  // },

  data: () => ({
    path: [],
    user_logged: false
  }),
  watch: {
    "$route.path"() {
      this.loadBreadcrumbs();
    }
  },
  methods: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    loadBreadcrumbs() {
      let data = this.$route.meta.breadCrumbs;
      this.path = [];
      if (!data) return;

      // typeof item.link === 'string'
      // ? { name: item.link }
      // : item.link === null || item.link === undefined
      // ? $route.path
      // : item.link

      for (let i of data) {
        let name =
          typeof i.name === "function" ? i.name(this.$route.params) : i.name;
        let link =
          typeof i.link === "function" ? i.link(this.$route.params) : i.link;

        this.path.push({
          name,
          link:
            typeof link === "string"
              ? { name: link }
              : !link
              ? this.$route.path
              : link
        });
      }
      if (this.path.length > 1) {
        this.$store.commit("setPrevPage", this.path[this.path.length - 2]);
      }
    }
  },
  mounted() {
    this.loadBreadcrumbs();
  }
};
</script>

<style src="@/assets/css/all.css"></style>
<style>
body {
  font-family: "Roboto Helvetica";
}
</style>

<style lang="scss">
// Odkomentować, jeżeli będą potrzebne ikonki "Material Design"
// $material-design-icons-font-directory-path: "~material-design-icons-iconfont/dist/fonts/";
// @import "~material-design-icons-iconfont/src/material-design-icons";
//

a {
  text-decoration: none !important;
}

.breadcrumbs {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding-left: 0 !important;
  color: rgb(229, 229, 229) !important;

  li {
    list-style-type: none;
    padding-left: 0;
    height: 100%;

    > * {
      color: rgb(229, 229, 229) !important;
      text-decoration: none;
    }

    &:not(:first-child)::before {
      content: "\f054";
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      font-size: 20px;
      display: inline;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
}
</style>
