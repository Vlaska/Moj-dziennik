<template>
  <v-dialog v-model="active" max-width="400">
    <v-card>
      <v-card-title class="headline">Usunąć uwagę? </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <p>Czy na pewno chcesz tą uwagę?</p>
          <p>Tej akcji nie da się odwrócić.</p>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="$emit('close-modal')"
          >Anuluj</v-btn
        >
        <v-btn color="red" text @click="$emit('delete-note', student, note)">Usuń</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: Boolean,
    student: Number,
    note: Number
  }
};
</script>
