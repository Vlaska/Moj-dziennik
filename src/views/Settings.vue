<template>
  <v-container>
    <title-of-page title="Ustawienia" />
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <p>
          Na tej stronie znajdują się ustawienia konta i danych personalnych.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TitleOfPage from "@/components/TitleOfPage.vue";

export default {
  components: { TitleOfPage }
};
</script>