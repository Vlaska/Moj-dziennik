<template>
  <v-dialog persistent v-model="active" max-width="700">
    <v-card>
      <v-card-title class="headline"
        >Kolumna nie jest zdefiniowana</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <p>
            Kolumna, do której próbujesz wstawić ocenę nie jest zdefiniowana.
          </p>
          <p>Czy chcesz stworzyć nową kolumnę?</p>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="$emit('close-modal')"
          >Zamknij</v-btn
        >
        <v-btn color="primary" text @click="onSave">Dodaj</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: Boolean,
    onSave: { type: Function, required: true }
  }
};
</script>
