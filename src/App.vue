<template>
  <v-app>
    <!-- <v-toolbar app dark class="indigo">
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify &nbsp;</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        ><span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <HelloWorld />
    </v-content> -->

    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main> -->
    <v-app-bar app="" color="indigo darken-1" dark>
      <div class="d-flex align-center">
        <h2>
          <!-- <a href="/" style="color: inherit; text-decoration: inherit"
            >Mój Dziennik</a
          > -->
          <router-link to="/" style="color: inherit; text-decoration: inherit"
            >Mój Dziennik</router-link
          >
        </h2>
        <!-- <div v-if="path.length" style="padding-left: 12px; margin-right: -12px">
          <v-icon>mdi-chevron-right</v-icon>
        </div> -->
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
      <!-- <v-btn flat="" href="/login" v-if="!user_logged" color="info"
        >Zaloguj</v-btn -->
      <!-- > -->
      <router-link to="/login" v-if="!user_logged">
        <v-btn flat="">Zaloguj</v-btn>
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

export default {
  name: "App",

  // components: {
  //   HelloWorld
  // },

  data: () => ({
    //
    path: [
      {
        text: "<h2>Mój dziennik</h2>",
        disbled: false,
        href: "#"
      },
      {
        text: "<h2>Mój dziennik</h2>",
        disbled: false,
        href: "#"
      }
    ],
    user_logged: false
  })
};
</script>
