<template>
  <v-container>
    <title-of-page title="Uwagi" />

    <v-row class="d-flex justify-center">
      <v-container fluid class="d-flex justify-center my-2 py-0">
        <v-col cols="12" sm="8">
          <v-row>
            <v-select
              v-model="selectedClass"
              :items="classes"
              outlined
              dense
              label="Klasa"
            ></v-select>
          </v-row>
          <div v-if="selectedClass !== ''">
            <v-row>
              <v-autocomplete
                v-model="selectedStudent"
                :items="studentsData"
                outlined
                dense
                label="Uczeń"
              ></v-autocomplete>
            </v-row>
            <v-row>
              <div class="visibility-note-controls">
                <v-btn @click="all" color="indigo" dark
                  >Pokaż wszystkie uwagi</v-btn
                >
                <v-btn @click="none" color="indigo" dark
                  >Ukryj wszystkie uwagi</v-btn
                >
              </div>
              <v-expansion-panels multiple v-model="openedStudents">
                <v-expansion-panel v-for="i in studentsData" :key="i.value">
                  <v-expansion-panel-header
                    class="body-1"
                    style="font-size: 20px; font-weight: 500"
                    >{{ i.text }}</v-expansion-panel-header
                  >
                  <v-expansion-panel-content class="body-2">
                    <template v-if="notes[i.value] && notes[i.value].length">
                      <!-- <div
                        v-for="(j, idx) in notes[i.value]"
                        :key="i + ',' + idx"
                      >
                        <p>{{ j.text }}</p>
                      </div> -->
                      <v-card
                        v-for="(j, idx) in notes[i.value]"
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
    notes: {},
    noteTitles: {
      pos: { text: "Uwaga pozytywna", color: "green--text text--darken-1" },
      note: { text: "Notatka", color: "grey--text text--darken-4" },
      neg: { text: "Uwaga negatywna", color: "red--text text--darken-4" }
    }
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
      this.students = require(`../klasy/${this.selectedClass}/${this.selectedClass}.json`);
      this.studentsData = [];
      for (let i of this.students) {
        this.studentsData.push({
          text: `${i.first_name} ${i.last_name}`,
          value: i.id,
          active: false
        });
      }
      this.notes = require(`../klasy/${this.selectedClass}/uwagi.json`);
    }
  },
  methods: {
    class_name(val) {
      return class_name(val);
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

.visibility-note-controls {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 15px;
  margin-top: 5px;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
