<template>
  <v-dialog persistent v-model="active" max-width="700">
    <v-card>
      <v-card-title class="headline">Informacja</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container class="mt-4">
          <v-row>
            <p>
              Tylko jedna z poniżyszch ocen, może zostać wystawiona jako ocena
              końcowa.
            </p>
          </v-row>
          <v-row class="d-flex justify-center align-center">
            <v-sheet
              outlined=""
              elevation="1"
              v-for="j in 6"
              :key="'not-' + j"
              width="42"
              height="42"
              style="font-size: 20px"
              :class="[colors[j], j !== 1 ? 'ml-4' : '']"
              class="d-flex justify-center align-center"
              rounded="lg"
              >{{ j }}</v-sheet
            >
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="$emit('close-modal')">Zamknij</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: Boolean,
    colors: Object
  }
};
</script>
