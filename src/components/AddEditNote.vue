<template>
  <v-dialog persistent v-model="active" max-width="700">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row class="mt-5">
            <v-autocomplete
              v-model="selectedStudents"
              label="Uczniowie"
              required
              :error-messages="studentsErrors()"
              no-data-text="Brak pasującej podpowiedzi."
              hint="Wybierz uczniów, którym uwaga ma zostać przypisana."
              persistent-hint
              :multiple="!editMode"
              item-name="name"
              item-value="id"
              :items="students"
            ></v-autocomplete>
          </v-row>
          <v-row class="mt-5">
            <v-select
              label="Typ uwagi"
              v-model="noteType"
              :items="noteTypes"
              item-name="name"
              required
            ></v-select>
          </v-row>
          <v-row>
            <v-textarea
              v-model="noteText"
              outlined
              required
              label="Treść"
            ></v-textarea>
          </v-row>
          <!-- <v-row
            ><span class="error--text" v-if="is_invalid"
              >Formularz nie został wypełniony poprawnie</span
            ></v-row
          > -->
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" v-if="editMode" dark text @click="deleteNote"
          >Usuń</v-btn
        >
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
    noteText: "",
    is_invalid: false,
    selectedStudents: []
  }),
  props: {
    active: { type: Boolean, default: true },
    title: String,
    students: Object,
    editMode: {
      type: Boolean,
      default: false
    },
    onSave: { type: Function, required: true }
  },
  methods: {
    deleteNote() {
      this.$emit("delete-note");
    },
    close() {
      this.$emit("close-modal");
    },
    save() {
      this.is_invalid = this.$v.name.$invalid;
      if (this.is_invalid) return;
      this.onSave({
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
    },
    nameInput(event) {
      this.name = event.srcElement.value;
      this.$v.name.$touch();
    }
  },
  mounted() {
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
