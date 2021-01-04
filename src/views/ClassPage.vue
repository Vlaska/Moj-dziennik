<template>
  <v-container>
    <v-row class="d-flex justify-center mt-10 mb-5">
      <p class="display-2">Klasa {{ class_name($route.params.class_name) }} &mdash; {{ subject_codes[$route.params.subject] }}</p>
    </v-row>
    <v-row class="d-flex flex-sm-row flex-column-reverse justify-center">
      <v-col col="12" md="6">
        <page-menu :pages="pages"></page-menu>
      </v-col>
      <v-col col="12" md="5">
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
        url: "#",
        image: "https://via.placeholder.com/150"
      },
      {
        text: "Obecności",
        url: "#",
        image: "https://via.placeholder.com/150"
      },
      {
        text: "Statystyki",
        url: "#",
        image: "https://via.placeholder.com/150"
      },
      {
        text: "Uwagi",
        url: "#",
        image: "https://via.placeholder.com/150"
      },
      {
        text: "Powrót",
        url: { name: "mainPage" },
        image: "https://via.placeholder.com/150"
      }
    ],
    subject_codes: {
      jpolski: "Język Polski",
      informatyka: "Informatyka"
    }
  }),
  methods: {
    class_name(i) {
      return "I".repeat(parseInt(i[0])) + i[1];
    }
  },
  components: {
    Subjects,
    PageMenu
  }
};
</script>