<template>
  <v-container>
    <title-of-page title="Wiadomości" />
    <!-- <v-form class="d-flex justify-center" @submit.prevent>
      <v-col cols="12" sm="8">
        <v-row>
          <v-text-field label="Wiadomość do"></v-text-field>
        </v-row>
        <v-row>
          <v-textarea label="Treść wiadomości"></v-textarea>
        </v-row>
        <v-spacer></v-spacer>
        <v-row class="d-flex justify-end pt-4">
          <v-btn color="primary">Wyślij wiadomość</v-btn></v-row
        >
      </v-col>
    </v-form> -->
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <p>Na tej stronie znajdują się wiadmości przychodzące/wychodzące.</p>
        <p>Istnieje również możliwość wysłania nowych wiadomości.</p>
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