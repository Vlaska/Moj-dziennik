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
                <v-btn color="green" dark @click="addEditNote($event)"
                  >Dodaj nową uwagę</v-btn
                >
              </div>
              <v-expansion-panels multiple v-model="openedStudents" hover>
                <v-expansion-panel v-for="i in filterStudents" :key="i.id">
                  <v-expansion-panel-header
                    class="body-1"
                    style="font-size: 20px; font-weight: 500"
                    >{{ i.text }}</v-expansion-panel-header
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
                              @click="removeNote($event)"
                              :student="i.id"
                              :note="idx"
                              >Usuń</v-btn
                            >
                            <v-btn
                              color="primary"
                              dark
                              @click="addEditNote($event)"
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
                        @click="addEditNote($event)"
                        >Dodaj nową uwagę</v-btn
                      >
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </div>
        </v-col>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import TitleOfPage from "@/components/TitleOfPage";
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
    openningAll: false
  }),
  components: {
    TitleOfPage
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
          text: `${i.first_name} ${i.last_name}`,
          id: i.id
        });
      }
      this.studentsData = studentsData;
      this.filter = "";
      this.notes = require(`../klasy/${this.selectedClass}/uwagi.json`);
    },
    filter: "filterStudents",
    studentsData: "filterStudents"
  },
  methods: {
    filterStudents() {
      if (this.filter.length === 0) {
        this.filterStudents = this.studentsData;
        return;
      }
      let query = this.filter.toLowerCase();
      this.filterStudents = this.studentsData.filter((val) =>
        val.text.toLocaleLowerCase().includes(query)
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
    addEditNote(event) {},
    // eslint-disable-next-line no-unused-vars
    removeNote(event) {},
    filterInput(event) {
      this.filter = event.srcElement.value;
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
