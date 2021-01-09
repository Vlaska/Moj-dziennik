<template>
  <v-container>
    <title-of-page :prevBtn="false" title="Wylogowano" />
    <v-row class="d-flex flex-sm-row flex-column-reverse justify-center mt-6">
      <v-col col="12" md="6">
        <p>Zostałeś wylogowany.</p>
        <p>
          Jeżeli chcesz się zalogować ponownie,
          <router-link :to="{ name: 'login' }">kliknij tutaj</router-link>.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TitleOfPage from "../components/TitleOfPage.vue";

export default {
  mounted() {
    this.$store.commit("logOut");
  },
  components: {
    TitleOfPage
  }
};
</script>
