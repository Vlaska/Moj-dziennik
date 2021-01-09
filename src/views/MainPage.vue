<template>
  <v-container>
    <v-row class="d-flex justify-center mt-10 mb-5">
      <p class="display-2">Strona główna</p>
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
  data: () => ({
    pages: [
      {
        text: "Plan zajęć",
        url: "#",
        image: require("@/assets/icons/png/appointment.png")
      },
      {
        text: "Uwagi",
        url: { name: "notes" },
        image: require("@/assets/icons/png/004-exclamation-mark.png")
      },
      {
        text: "Wiadomości",
        url: "#",
        image: require("@/assets/icons/png/005-chat.png")
      },
      {
        text: "Ustawienia",
        url: "#",
        image: require("@/assets/icons/png/006-settings.png")
      },
      {
        text: "Wyloguj",
        url: { name: "logout" },
        image: require("@/assets/icons/png/007-logout.png")
      }
    ]
  }),
  components: {
    Subjects,
    PageMenu
  }
};
</script>
