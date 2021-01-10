<template>
  <v-container>
    <title-of-page title="Uwagi" />

    <v-row class="d-flex justify-center">
      <v-container fluid class="d-flex justify-center mb-2 mt-4 py-0">
        <v-col cols="12" sm="8">
          <v-row>
            <v-select
              v-model="selectedClass"
              :items="classes"
              outlined
              dense
              label="Klasa"
              hint="Wybierz klasę, dla której chcesz przeglądać uwagi."
              persistent-hint
            ></v-select>
          </v-row>
          <div class="mt-4" v-if="selectedClass !== ''">
            <v-row>
              <!-- <v-combobox
                v-model="filter"
                :items="studentsData"
                outlined
                dense
                label="Wyszukaj"
                no-data-text="Brak ucznia pasuącego do wprowadzonej wartości."
              ></v-combobox> -->
              <v-text-field
                v-model="filter"
                outlined
                dense
                label="Wyszukaj"
              ></v-text-field>
            </v-row>
            <v-row>
              <div class="note-controls">
                <div class="visibility-note-controls">
                  <v-btn @click="all" color="indigo" dark
                    >Pokaż wszystkie uwagi</v-btn
                  >
                  <v-btn @click="none" color="indigo" dark
                    >Ukryj wszystkie uwagi</v-btn
                  >
                </div>
                <v-btn
                  color="green"
                  dark
                  @click.prevent="openAddNoteModal($event)"
                  >Dodaj nową uwagę</v-btn
                >
              </div>
              <v-expansion-panels multiple v-model="openedStudents" hover>
                <v-expansion-panel v-for="i in filteredStudents" :key="i.id">
                  <v-expansion-panel-header
                    class="body-1"
                    style="font-size: 20px; font-weight: 500"
                    >{{ i.name }}</v-expansion-panel-header
                  >
                  <v-expansion-panel-content class="body-2">
                    <template v-if="notes[i.id] && notes[i.id].length">
                      <v-card
                        v-for="(j, idx) in notes[i.id]"
                        :key="i + ',' + idx"
                        color="normal"
                        elevate="0"
                        outlined
                        class="mb-1"
                        :class="noteTitles[j.type].color"
                      >
                        <v-card-title class="note-title">{{
                          noteTitles[j.type].text
                        }}</v-card-title>
                        <v-card-subtitle class="grey--text text--darken-3">
                          <p>Wystawiona przez: {{ j.author }}</p>
                          <p class="mt-n4">Dnia: {{ j.date }}</p>
                        </v-card-subtitle>
                        <v-divider class="mx-4 mt-n5"></v-divider>
                        <v-card-text class="grey--text text--darken-3">{{
                          j.text
                        }}</v-card-text>
                        <template v-if="j.author === 'Jan Kowalski'"
                          ><v-divider class="mx-4"></v-divider>
                          <v-card-actions class="d-flex justify-end my-2 mr-4">
                            <v-btn
                              color="red"
                              dark
                              @click.prevent="removeNote($event)"
                              :student="i.id"
                              :note="idx"
                              >Usuń</v-btn
                            >
                            <v-btn
                              color="primary"
                              dark
                              @click.prevent="openEditNoteModal"
                              :student="i.id"
                              :note="idx"
                              >Edytuj</v-btn
                            >
                          </v-card-actions>
                        </template>
                      </v-card>
                    </template>
                    <div v-else>
                      <v-card color="normal" elevate="1" outlined>
                        <v-card-text
                          ><i class="grey--text text--darken-3"
                            >Uczeń nie posiada rzadnych uwag.</i
                          ></v-card-text
                        >
                      </v-card>
                    </div>
                    <div class="d-flex justify-end mt-3">
                      <v-btn
                        color="green"
                        dark
                        :student="i.id"
                        @click.prevent="openAddNoteModal($event)"
                        >Dodaj nową uwagę</v-btn
                      >
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </div>
        </v-col>
        <component
          v-if="show_modal"
          :is="modal"
          v-bind="modalData"
          @close-modal="closeModal"
          @delete-note="removeNote"
        />
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import TitleOfPage from "@/components/TitleOfPage";
import AddEditNote from "@/components/AddEditNote";
import { class_name } from "@/main";
export default {
  data: () => ({
    classes: [
      { text: "Ia", value: "1a" },
      { text: "Ib", value: "1b" },
      { text: "Ic", value: "1c" },
      { text: "Id", value: "1d" },
      { text: "Ie", value: "1e" },
      { text: "If", value: "1f" },
      { text: "IIa", value: "2a" },
      { text: "IIIa", value: "3a" },
      { text: "IIIb", value: "3b" },
      { text: "IIIc", value: "3c" }
    ],
    selectedClass: "",
    students: [],
    studentsData: [],
    filteredStudents: [],
    openedStudents: [],
    selectedStudent: 0,
    filter: "",
    notes: {},
    noteTitles: {
      pos: { text: "Uwaga pozytywna", color: "green--text text--darken-1" },
      note: { text: "Notatka", color: "grey--text text--darken-4" },
      neg: { text: "Uwaga negatywna", color: "red--text text--darken-4" }
    },
    openningAll: false,
    modal: "",
    modalData: {},
    show_modal: false
  }),
  components: {
    TitleOfPage,
    AddEditNote
  },
  watch: {
    selectedClass() {
      if (this.selectedClass !== this.$route.params.class_name) {
        this.$router.replace({
          name: "notes",
          params: { class_name: this.selectedClass }
        });
      }

      this.selectedStudent = [];
      let students = JSON.parse(localStorage.getItem(this.selectedClass));
      if (!students) {
        students = require(`../klasy/${this.selectedClass}/${this.selectedClass}.json`);
        localStorage.setItem(this.selectedClass, JSON.stringify(students));
      }

      this.students = students;
      let studentsData = [];
      for (let i of this.students) {
        studentsData.push({
          name: `${i.first_name} ${i.last_name}`,
          id: i.id
        });
      }
      this.openedStudents = [];
      this.studentsData = studentsData;
      this.filter = "";
      this.notes = require(`../klasy/${this.selectedClass}/uwagi.json`);
    },
    filter: "filterStudents",
    studentsData: "filterStudents"
  },
  methods: {
    getSourceElementData(event) {
      let t = event.currentTarget;
      return {
        studentIdx: parseInt(t.getAttribute("student")),
        noteIdx: parseInt(t.getAttribute("note"))
      };
    },
    filterStudents() {
      if (this.filter.length === 0) {
        this.filteredStudents = this.studentsData;
        return;
      }
      let query = this.filter.toLowerCase();
      this.filteredStudents = this.studentsData.filter((val) =>
        val.name.toLocaleLowerCase().includes(query)
      );
    },
    class_name(val) {
      return class_name(val);
    },
    all() {
      this.openningAll = true;
      let tmp = ((next, stop) => {
        if (next >= stop) this.openningAll = false;
        if (!this.openningAll) return;
        this.openedStudents.push(next);
        setTimeout(() => tmp(next + 1, stop), 100);
      }).bind(this);
      tmp(0, this.studentsData.length);
    },
    none() {
      this.openningAll = false;
      this.openedStudents.sort();
      let tmp = (() => {
        if (this.openedStudents.length === 0) return;
        if (this.openningAll) this.openningAll = false;
        this.openedStudents.pop();
        setTimeout(tmp, 10);
      }).bind(this);
      tmp();
    },
    // eslint-disable-next-line no-unused-vars
    dateToNum(d) {
      let t = d.split(".");
      return new Number(t[2] + t[1] + t[0]);
    },
    openAddNoteModal(event) {
      this.show_modal = true;
      let data = this.getSourceElementData(event);
      let studentId = data.studentIdx;

      this.modalData = {
        editMode: false,
        title: "Dodaj nową uwagę",
        studentsData: this.studentsData,
        data: {},
        onSave: ((data) => {
          let date = new Date();
          let creationDate = `${this.leadingZero(
            date.getDate()
          )}.${this.leadingZero(date.getMonth() + 1)}.${date.getFullYear()}`;

          for (let i of data.students) {
            let note = {
              text: data.noteText,
              type: data.noteType,
              author: "Jan Kowalski",
              date: creationDate
            };
            let studentsNotes = this.notes[i];
            if (Array.isArray(studentsNotes)) {
              studentsNotes.push(note);
            } else {
              this.notes[i] = [note];
            }
          }
          this.closeModal();
        }).bind(this)
      };
      if (!isNaN(studentId)) this.modalData.data.student = studentId;
      this.modal = "add-edit-note";
    },
    // eslint-disable-next-line no-unused-vars
    removeNote(event) {},
    filterInput(event) {
      this.filter = event.srcElement.value;
    },
    closeModal() {
      this.modal = "";
      this.modalData = {};
    },
    openEditNoteModal(event) {
      this.show_modal = true;
      let data = this.getSourceElementData(event);
      let studentId = data.studentIdx;
      let noteIdx = data.noteIdx;
      let note = this.notes[studentId][noteIdx];

      this.modalData = {
        editMode: true,
        title: "Edytuj uwagę",
        data: {
          student: studentId,
          note
        },
        studentsData: this.studentsData,
        onSave: ((data) => {
          note.text = data.noteText;
          let date = new Date();
          note.date = `${this.leadingZero(date.getDate())}.${this.leadingZero(
            date.getMonth() + 1
          )}.${date.getFullYear()}`;
          note.type = data.noteType;
          this.closeModal();
        }).bind(this)
      };
      this.modal = "add-edit-note";
    }
  },
  mounted() {
    let initClass = this.$route.params.class_name;
    if (initClass !== undefined) {
      this.selectedClass = initClass;
    }
  }
};
</script>

<style lang="scss">
.note-title {
  font-size: 16px !important;
  font-weight: 400 !important;
}

.note-controls {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 15px;
}

.visibility-note-controls {
  display: flex;
  justify-content: flex-start;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
