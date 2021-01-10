<template>
  <v-dialog persistent v-model="active" max-width="700">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row class="mt-1">
            <v-autocomplete
              v-model="selectedStudents"
              label="Uczniowie"
              required
              :error-messages="selectedStudentsErrors()"
              no-data-text="Brak pasującej podpowiedzi."
              hint="Wybierz uczniów, którym uwaga ma zostać przypisana."
              persistent-hint
              :multiple="!editMode"
              :disabled="editMode"
              @input="$v.selectedStudents.$touch"
              @blur="$v.selectedStudents.$touch"
              item-text="name"
              item-value="id"
              chips
              :items="studentsData"
            >
              <template v-slot:selection="{ item }">
                <v-chip
                  :close="!editMode"
                  @click:close="removeStudent(item.id)"
                  >{{ item.name }}</v-chip
                >
              </template>
            </v-autocomplete>
          </v-row>
          <v-row class="mt-7">
            <v-select
              label="Typ uwagi"
              v-model="noteType"
              :items="noteTypes"
              item-name="name"
              @input="$v.noteType.$touch"
              @blur="$v.noteType.$touch"
              :error-messages="noteTypeErrors()"
              required
            >
              <template v-slot:selection="{ item }">
                <span :class="item.color">{{ item.text }}</span>
              </template>
              <template v-slot:item="{ item }">
                <span :class="item.color">{{ item.text }}</span>
              </template>
            </v-select>
          </v-row>
          <v-row class="mt-7">
            <v-textarea
              v-model="noteText"
              outlined
              required
              @input="$v.noteText.$touch"
              @blur="$v.noteText.$touch"
              :error-messages="noteTextErrors()"
              label="Treść"
            ></v-textarea>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider class="mt-n5"></v-divider>
      <v-card-actions>
        <v-btn color="red" v-if="editMode" dark text @click="deleteNote"
          >Usuń</v-btn
        >
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
    noteText: "",
    noteType: "",
    noteIdx: -1,
    is_invalid: false,
    selectedStudents: [],
    noteTypes: [
      {
        text: "Uwaga pozytywna",
        value: "pos",
        color: "green--text text--darken-1"
      },
      { text: "Notatka", value: "note", color: "grey--text text--darken-4" },
      {
        text: "Uwaga negatywna",
        value: "neg",
        color: "red--text text--darken-4"
      }
    ]
  }),
  props: {
    active: { type: Boolean, default: true },
    title: String,
    data: Object,
    studentsData: Array,
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
      if (this.$v.$invalid) return;
      this.onSave({
        students: this.selectedStudents,
        noteText: this.noteText,
        noteType: this.noteType
      });
    },
    selectedStudentsErrors() {
      const errors = [];
      if (!this.$v.selectedStudents.$dirty) return errors;
      !this.$v.selectedStudents.required &&
        errors.push("Musi zostać podany conajmniej jeden uczeń.");
      return errors;
    },
    noteTypeErrors() {
      const errors = [];
      if (!this.$v.noteType.$dirty) return errors;
      !this.$v.noteType.required && errors.push("Należy wybrać typ uwagi.");
      return errors;
    },
    noteTextErrors() {
      const errors = [];
      if (!this.$v.noteText.$dirty) return errors;
      !this.$v.noteText.required && errors.push("Należy podać treść uwagi.");
      return errors;
    },
    removeStudent(id) {
      let idx = this.selectedStudents.indexOf(id);
      if (idx > -1) {
        this.selectedStudents.splice(idx, 1);
      }
    }
  },
  mounted() {
    if (this.data) {
      if (this.data.student !== undefined) {
        if (this.editMode) {
          this.selectedStudents = this.data.student;
        } else {
          this.selectedStudents = [this.data.student];
        }
      }
      if (this.data.note) {
        this.noteType = this.data.note.type || "";
        this.noteText = this.data.note.text || "";
      }
    }
  },
  validations: {
    selectedStudents: {
      required
    },
    noteType: {
      required
    },
    noteText: {
      required
    }
  }
};
</script>
