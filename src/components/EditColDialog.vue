<template>
  <v-dialog persistent v-model="active" max-width="700">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row class="mt-5">
            <v-combobox
              v-model="name"
              label="Nazwa kolumny"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              autocomplete="off"
              :error-messages="nameErrors()"
              :items="suggestions"
            ></v-combobox>
          </v-row>
          <v-row class="mt-5">
            <v-slider
              label="Waga oceny"
              min="1"
              max="100"
              v-model="weight"
              :thumb-label="true"
              step="1"
            ></v-slider>
          </v-row>
          <v-row class="d-flex justify-end mt-n3">
            <v-col cols="12" md="3" class="px-0 pt-0">
              <v-text-field
                type="number"
                label="Waga"
                v-model="weight"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-textarea
              v-model="description"
              outlined
              label="Opis"
            ></v-textarea>
          </v-row>
          <v-row
            ><span class="error--text" v-if="is_invalid"
              >Formularz nie został wypełniony poprawnie</span
            ></v-row
          >
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="close">Zamknij</v-btn>
        <v-btn color="primary" text @click="save">Zapisz</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data: () => ({
    name: "",
    description: "",
    weight: 100,
    is_invalid: false
  }),
  props: {
    active: Boolean,
    title: String,
    data: Object,
    suggestions: Array,
    validator: Function
  },
  // watch: {
    // data(value) {
    //   if (!value) return;
    //   this.name = value.name;
    //   this.weight = value.weight;
    //   this.description = value.description || "";
    // },
    // active(value) {
    //   if (value) {
    //     this.$v.name.$reset;
    //     this.$v.$reset;
    //     this.is_invalid = false;
    //   }
    // }
  // },
  methods: {
    close() {
      this.$emit("close-modal");
    },
    save() {
      this.is_invalid = this.$v.name.$invalid;
      if (this.is_invalid) return;
      this.$emit("save", {
        name: this.name,
        description: this.description,
        weight: this.weight
      });
      this.$emit("close-modal");
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Nazwa kolumny jest wymagana.");
      !this.$v.name.isUnique &&
        errors.push("Kolumna z podaną nazwą już istnieje.");
      return errors;
    }
  },
  mounted () {
    if (this.data) {
      this.name = this.data.name;
      this.weight = this.data.weight;
      this.description = this.data.description || "";
    }
  },
  validations: {
    name: {
      required,
      isUnique(value) {
        return this.validator(value);
      }
    }
  }
};
</script>
