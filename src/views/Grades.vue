<template>
  <v-container>
    <v-row class="d-flex mt-10 mb-5 flex-column justify-center align-center">
      <p class="display-2">Oceny</p>
      <p class="display-1">
        Klasa {{ class_name($route.params.class_name) }} &mdash;
        {{ subject_codes[$route.params.subject] }}
      </p>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-container fluid class="grade-grid mb-10">
        <div style="grid-area: s">
          <div width="fit-content" class="text-right">
            <v-sheet
              outlined
              elevation="2"
              v-for="student in students"
              :key="student.id"
              class="pa-2"
              :width="width_of_name_plates"
            >
              {{ student.first_name + " " + student.last_name }}
            </v-sheet>
          </div>
        </div>
        <div
          style="grid-area: n"
          class="scrollable hide-scrollbar"
          ref="nameRow"
          @scroll="scrollTo($event, 'grades')"
        >
          <div width="fit-content" class="d-flex flex-row">
            <v-sheet
              outlined
              elevation="2"
              v-for="grade in grades"
              :key="grade.name"
              class="px-3 py-2 grade-name"
              :width="width_of_grade_column"
              :min-width="width_of_grade_column"
              :max-width="width_of_grade_column"
            >
              <span>{{ grade.name }}</span>
            </v-sheet>
            <v-sheet
              outlined
              elevation="2"
              v-for="grade in num_of_empty_cols"
              :key="grade"
              class="px-3 py-2 grade-name"
              :width="size_of_empty_col"
              :min-width="size_of_empty_col"
              :max-width="size_of_empty_col"
            >
              <span></span>
            </v-sheet>
          </div>
        </div>
        <div
          style="grid-area: g"
          class="d-flex scrollable"
          ref="grades"
          @scroll="scrollTo($event, 'nameRow')"
        >
          <div v-for="(grade, idx) in grades" :key="grade.name">
            <!-- {{ grade.grades[0].grade }} -->
            <v-sheet
              outlined
              elevation="2"
              v-for="i in grade.grades"
              :key="i.student"
              :student="i.student"
              :grade="idx"
              class="pa-2 d-flex justify-center align-center no-select"
              :class="[
                (current_grade !== 'pointer' && i.grade !== null) ||
                (i.grade === null && current_grade !== 'trash')
                  ? 'clickable'
                  : '',
                grade_colors[i.grade]
              ]"
              height="42"
              :width="width_of_grade_column"
              @mousedown="setGrade"
              >{{ i.grade }}</v-sheet
            >
          </div>
          <div v-for="i in num_of_empty_cols" :key="i">
            <v-sheet
              outlined
              elevation="2"
              v-for="j in students.length"
              :key="j"
              :student="j + 1"
              :grade="grades.length + i"
              class="pa-2 d-flex justify-center align-center no-select"
              :height="size_of_empty_col"
              :width="size_of_empty_col"
              @mousedown="setGrade"
            ></v-sheet>
          </div>
        </div>
        <div style="grid-area: fn">
          <v-sheet
            outlined=""
            elevation="2"
            class="px-3 py-2 grade-name final"
            :width="width_of_grade_column"
            >Ocena końcowa</v-sheet
          >
        </div>
        <div style="grid-area: fg">
          <div>
            <v-sheet
              outlined=""
              elevation="2"
              class="final"
              v-for="i in final_grades"
              :key="i"
              :class="
                (current_grade !== 'pointer' && i !== null) ||
                (i === null && current_grade !== 'trash')
                  ? 'clickable'
                  : ''
              "
              height="42"
              :width="width_of_grade_column"
              >{{ i }}</v-sheet
            >
          </div>
        </div>
      </v-container>
    </v-row>
    <selector
      :options="types_of_grades"
      name="Oceny"
      :colors="grade_colors"
      @option-changed="gradeChanged"
    ></selector>
    <v-btn @click="resetData" color="indigo" dark>Zresetuj dane</v-btn>
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
    grade_colors: {
      1: "red--text text--accent-3",
      2: "blue--text text--lighten-1",
      3: "pink--text text--darken-2",
      4: "amber--text text--darken-4",
      5: "indigo--text text--darken-3",
      6: "purple--text text--darken-4",
      "2-": "green--text text--accent-3",
      "3-": "blue-grey--text text--lighten-2",
      "4-": "purple--text text--accent-2",
      "5-": "deep-orange--text text--accent-4",
      "2=": "light-blue--text text--accent-4",
      "3=": "orange--text text--darken-3",
      "4=": "grey--text text--darken-3",
      "5=": "light-green--text text--darken-1",
      "2+": "purple--text text--accent-3",
      "3+": "deep-purple--text text--darken-3",
      "4+": "teal--text text--darken-3",
      "5+": "deep-orange--text text--darken-1",
      "+": "pink--text text--accent-3",
      "-": "brown--text text--darken-2",
      N: "black--text",
      null: "black--text"
    },
    current_grade: "pointer",
    width_of_name_plates: 205,
    width_of_grade_column: 120,
    size_of_empty_col: 42,
    num_of_empty_cols: 10,
    scroll_pos: 0
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
    },
    final_grades() {
      if (!this.final_grades) {
        this.final_grades = this.fillArray(null, this.students.length);
      }
      let key = `${this.$route.params.class_name}-${this.$route.params.subject}-final`;
      localStorage.setItem(key, JSON.stringify(this.final_grades));
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
      let final_grades_key = `${fetchClassName}-${fetchSubject}-finals`;
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

      if (!(t = localStorage.getItem(final_grades_key))) {
        this.final_grades = this.fillArray(null, this.students.length);
      } else {
        this.final_grades = JSON.parse(t);
      }

      this.reset_data = false;
    },
    setCurrentGrade(grade) {
      this.current_grade = grade;
    },
    resetCurrentGrade() {
      this.current_grade = "pointer";
    },
    gradeChanged(value) {
      this.current_grade = value;
    },
    setGrade(event) {
      if (this.current_grade === "pointer") return;
      let t = event.target;
      let student = parseInt(t.getAttribute("student"));
      let grade_column = parseInt(t.getAttribute("grade"));
      if (this.current_grade === "trash") {
        this.grades[grade_column].grades[student - 1].grade = null;
      } else {
        this.grades[grade_column].grades[
          student - 1
        ].grade = this.current_grade;
      }
    },
    resetData() {
      const fetchClassName = this.$route.params.class_name;
      const fetchSubject = this.$route.params.subject;

      localStorage.removeItem(`${fetchClassName}`);
      localStorage.removeItem(`${fetchClassName}-${fetchSubject}`);
      localStorage.removeItem(`${fetchClassName}-${fetchSubject}-final`);
      this.fetchData();
    },
    fillArray(value, len) {
      let arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(value);
      }
      return arr;
    },
    scrollTo(src_event, dst_ref) {
      let dst = this.$refs[dst_ref];
      // console.log(dst);
      let pos = src_event.target.scrollLeft;
      dst.scrollLeft = pos;
    }
  },
  components: { Selector }
};
</script>

<style>
.grade-grid {
  display: grid;
  overflow: hidden;
  grid-template-columns: 205px minmax(0, 1fr) 120px;
  /* grid-auto-columns: min-content; */
  grid-template-areas:
    ". n fn"
    "s g fg";
}

.grade-name {
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

.final {
  border-color: red !important;
  color: red !important;
  background-color: #ffebee !important;
}

.no-select {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}

.clickable {
  cursor: pointer;
}

.scrollable {
  overflow-x: scroll;
}

.hide-scrollbar::-webkit-scrollbar {
  width: 0;
  background: transparent;
  display: none;
  /* transform: rotate(180deg); */
}
</style>
