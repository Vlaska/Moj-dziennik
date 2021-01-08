<template>
  <v-container>
    <v-row class="d-flex justify-center mt-10 mb-5">
      <p class="display-2">
        Klasa {{ class_name($route.params.class_name) }} &mdash;
        {{ subject_codes[$route.params.subject] }}
      </p>
    </v-row>
    <v-row class="d-flex flex-sm-row flex-column-reverse justify-center">
      <v-col col="12" xl="3" lg="4" md="6">
        <page-menu :pages="pages"></page-menu>
      </v-col>
      <v-col col="12" xl="3" md="5">
        <subjects></subjects>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Subjects from "@/components/Subjects";
import PageMenu from "@/components/PageMenu";
export default {
  name: "ClassPage",
  data: () => ({
    pages: [
      {
        text: "Oceny",
        url: { name: "grades" },
        image: require("@/assets/icons/png/002-best-5.png")
      },
      {
        text: "Obecności",
        url: "#",
        image: require("@/assets/icons/png/008-pixels.png")
      },
      {
        text: "Statystyki",
        url: "#",
        image: require("@/assets/icons/png/001-analytics.png")
      },
      {
        text: "Uwagi",
        url: "#",
        image: require("@/assets/icons/png/004-exclamation-mark.png")
      },
      {
        text: "Powrót",
        url: { name: "mainPage" },
        image: require("@/assets/icons/png/003-left-arrow.png")
      }
    ]
  }),

  components: {
    Subjects,
    PageMenu
  }
};
</script>
