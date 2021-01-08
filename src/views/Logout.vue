<template>
  <v-container>
    <v-row class="d-flex justify-center mt-10 mb-5">
      <p class="display-2">Wylogowano</p>
    </v-row>
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
export default {
  mounted() {
    this.$store.commit("logOut");
  }
};
</script>
