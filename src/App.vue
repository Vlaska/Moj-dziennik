<template>
  <v-app>
    <v-app-bar app="" color="indigo darken-1" dark>
      <div class="d-flex align-center">
        <h2>
          <router-link
            :to="{ name: 'Home' }"
            style="color: inherit; text-decoration: inherit"
            >Mój Dziennik</router-link
          >
        </h2>
        <v-breadcrumbs divider="/" :items="path">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
              <span style="color: rgb(229, 229, 229)">{{ item.text }}</span>
            </v-breadcrumbs-item>
          </template>
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'login' }" v-if="!user_logged">
        <v-btn>Zaloguj</v-btn>
      </router-link>
      <div class="d-flex align-center" v-else><span>Witaj</span></div>
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
    //
    path: [
      // {
      //   text: "<h2>Mój dziennik</h2>",
      //   disbled: false,
      //   href: "#"
      // },
      // {
      //   text: "<h2>Mój dziennik</h2>",
      //   disbled: false,
      //   href: "#"
      // }
    ],
    user_logged: false
  })
};
</script>

<style src="@/assets/css/all.css"></style>
<style>
body {
  font-family: "Roboto Helvetica";
}
</style>

// <style lang="scss">
// $material-design-icons-font-directory-path: "~material-design-icons-iconfont/dist/fonts/";
// @import "~material-design-icons-iconfont/src/material-design-icons";
// </style>