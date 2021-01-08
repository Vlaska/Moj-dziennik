<template>
  <v-dialog v-model="active" max-width="700">
    <v-card>
      <v-card-title class="headline"
        >Usunąć oceny z całej kolumny?
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <p>Czy na pewno chcesz usunąć oceny z całej kolumny?</p>
          <p>Tej akcji nie da się odwrócić.</p>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="$emit('close-modal')"
          >Anuluj</v-btn
        >
        <v-btn color="error" text @click="deleteColumn">Usuń</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: Boolean,
    onDelete: { type: Function, required: true }
  },
  methods: {
    deleteColumn() {
      this.$emit("close-modal");
      this.onDelete();
    }
  }
};
</script>
