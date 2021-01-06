<template>
  <v-container>
    <v-row class="d-flex mt-10 mb-5 flex-column justify-center align-center">
      <p class="display-2">Oceny</p>
      <p class="display-1">
        Klasa {{ class_name($route.params.class_name) }} &mdash;
        {{ subject_codes[$route.params.subject] }}
      </p>
    </v-row>

    <v-row>
      <v-container fluid class="grade-grid">
        <div style="grid-area: s">
          <div width="fit-content" class="text-right">
            <v-sheet
              outlined
              elevation="2"
              v-for="student in students"
              :key="student.id"
              class="pa-2"
              width="100%"
            >
              {{ student.first_name + " " + student.last_name }}
            </v-sheet>
          </div>
        </div>
        <div style="grid-area: n">
          <div width="fit-content" class="d-flex flex-row">
            <v-sheet
              outlined
              elevation="2"
              v-for="grade in grades"
              :key="grade.name"
              class="px-3 py-2 grade-name"
            >
              <span>{{ grade.name }}</span>
            </v-sheet>
          </div>
        </div>
        <div style="grid-area: g" class="d-flex">
          <div v-for="grade in grades" :key="grade.name">
            <!-- {{ grade.grades[0].grade }} -->
            <v-sheet
              outlined
              elevation="2"
              v-for="i in grade.grades"
              :key="i.student"
              class="pa-2 d-flex justify-center align-center"
              height="42"
              width="120"
              >{{ i.grade }}</v-sheet
            >
          </div>
        </div>
      </v-container>
    </v-row>
    <selector
      :options="types_of_grades"
      name="Oceny"
      @option-changed="gradeChanged"
    ></selector>
  </v-container>
</template>

<script>
// import axios from "axios";
import Selector from "@/components/Selector";

export default {
  data: () => ({
    students: null,
    grades: null,
    final_grades: null,
    types_of_grades: [
      ["1"],
      ["2", "2-", "2=", "2+"],
      ["3", "3-", "3=", "3+"],
      ["4", "4-", "4=", "4+"],
      ["5", "5-", "5=", "5+"],
      ["6"],
      ["+", "-", "N"]
    ],
    current_grade: "pointer"
  }),
  created() {
    this.fetchData();
  },
  props: {
    options: Array,
    name: String
  },
  watch: {
    $route: "fetchData",
    students: {
      deep: true,
      handler: function () {
        this.final_grades = [];
        let key = `${this.$route.params.class_name}`;
        // if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(this.students));
        // }
      }
    },
    grades: {
      deep: true,
      handler: function () {
        let key = `${this.$route.params.class_name}-${this.$route.params.subject}`;
        // if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(this.grades));
        // }
      }
    }
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      const fetchClassName = this.$route.params.class_name;
      const fetchSubject = this.$route.params.subject;
      let students_key = `${fetchClassName}`;
      let grades_key = `${fetchClassName}-${fetchSubject}`;
      let t;
      if (!(t = localStorage.getItem(students_key))) {
        this.students = require(`@/klasy/${fetchClassName}/${fetchClassName}.json`);
      } else {
        this.students = JSON.parse(t);
      }

      if (!(t = localStorage.getItem(grades_key))) {
        this.grades = require(`@/klasy/${fetchClassName}/${fetchSubject}.json`);
      } else {
        this.grades = JSON.parse(t);
      }
    },
    setCurrentGrade(grade) {
      this.current_grade = grade;
    },
    resetCurrentGrade() {
      this.current_grade = "pointer";
    },
    gradeChanged(value) {
      this.current_grade = value;
    }
  },
  components: { Selector }
};
</script>

<style>
.grade-grid {
  display: grid;
  grid-template-columns: auto repeat(8, 1fr);
  grid-template-areas:
    ". n n n n n n n n"
    "s g g g g g g g g";
}

.grade-name {
  max-width: 120px;
  min-width: 120px;
  overflow-wrap: break-word;
  overflow-wrap: anywhere;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  text-align: center;
}

/* .name-area {
	display: flex;
} */

.final-grades {
  border-color: red;
  font-color: red;
}
</style>
