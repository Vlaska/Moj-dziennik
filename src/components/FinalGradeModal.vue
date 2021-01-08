<template>
  <v-dialog persistent v-model="active" max-width="700">
    <v-card>
      <v-card-title class="headline">Ocena końcowa</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-radio-group v-model="changedWeight">
              <template v-slot:label>Sposób obliczania oceny końcowej</template>
              <v-radio
                v-for="i in options"
                :key="i.value"
                :label="i.text"
                :value="i.value"
              ></v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <v-switch
              v-model="changedCalculate"
              label="Obliczaj średnią przy zmianie"
            ></v-switch>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="$emit('close-modal')"
          >Zamknij</v-btn
        >
        <v-btn
          color="primary"
          text
          @click="onSave(changedWeight, changedCalculate)"
          >Zapisz</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    changedWeight: null,
    changedCalculate: null,
    options: [
      { value: "wa", text: "Średnia ważona" },
      { value: "aa", text: "Średnia arytmetyczna" }
    ]
  }),
  props: {
    active: Boolean,
    weight: String,
    calculate: Boolean,
    onSave: Function
  },
  mounted() {
    this.changedWeight = this.weight;
    this.changedCalculate = this.calculate;
  }
};
</script>
