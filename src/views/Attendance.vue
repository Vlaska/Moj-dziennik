<template>
  <v-container>
    <title-of-page title="Obecności" />
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <p>
          Na tej stronie nauczyciel wystawia obecności uczniom na poszczególnych
          zajęciach.
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