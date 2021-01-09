<template>
  <v-container>
    <title-of-page
      :prevBtn="false"
      :title="`Klasa ${class_name($route.params.class_name)} — ${
        subject_codes[$route.params.subject]
      }`"
    />
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
import TitleOfPage from '@/components/TitleOfPage.vue';
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
        url: { name: "notes", params: { class_name: "" } },
        image: require("@/assets/icons/png/004-exclamation-mark.png")
      },
      {
        text: "Powrót",
        url: { name: "mainPage" },
        image: require("@/assets/icons/png/003-left-arrow.png")
      }
    ]
  }),
  mounted() {
    this.updateNotePath();
  },
  methods: {
    getClassName() {
      return this.$route.params.class_name;
    },
    updateNotePath(class_name) {
      let t = this.pages.filter((x) => x.text === "Uwagi")[0];
      if (!class_name) class_name = this.getClassName();
      t.url.params.class_name = class_name;
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === "classPage") {
      this.updateNotePath(to.params.class_name);
    }
    next();
  },
  components: {
    Subjects,
    PageMenu,
    TitleOfPage
  }
};
</script>
