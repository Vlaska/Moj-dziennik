<template>
  <v-container>
    <title-of-page title="Plan zajęć" />
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <p>Na tej stronie znajduje się plan lekcji nauczyciela.</p>
        <p>
          Może się on również przełączać pomiędzy planami lekcji innych
          nauczycieli i klas.
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