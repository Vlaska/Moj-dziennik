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
      <v-container fluid class="d-flex justify-end my-2 py-0">
        <v-btn text class="d-flex align-center" @click="openEditModal">
          <v-icon class="pr-2">fas fa-plus</v-icon>
          <span style="font-size: 18px; font-weight: bold; margin-bottom: -2px;"
            >Dodaj nową kolumnę</span
          >
        </v-btn>
      </v-container>
      <v-container
        fluid
        class="grade-grid mb-10"
        @mouseleave="mouse_in_cell($event)"
      >
        <div style="grid-area: ." @mouseenter="mouse_in_cell($event)"></div>
        <div style="grid-area: s">
          <div width="fit-content" class="text-right">
            <v-sheet
              outlined
              elevation="2"
              v-for="student in students"
              :key="student.id"
              class="pa-2"
              :row="student.id - 1"
              :width="width_of_name_plates"
              @mouseenter="mouse_in_cell($event)"
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
              v-for="(grade, idx) in grades"
              :key="idx"
              :col="idx"
              class="px-3 py-2 grade-name clickable"
              :width="width_of_grade_column"
              :min-width="width_of_grade_column"
              :max-width="width_of_grade_column"
              @mouseenter="mouse_in_cell($event)"
              @mousedown="openEditModal(idx)"
            >
              <span>{{ grade.name }}</span>
            </v-sheet>
            <v-sheet
              outlined
              elevation="2"
              v-for="grade in num_of_empty_cols"
              :key="grades.length + grade - 1"
              :col="grades.length + grade - 1"
              class="px-3 py-2 grade-name empty clickable"
              :width="size_of_empty_col"
              :min-width="size_of_empty_col"
              :max-width="size_of_empty_col"
              @mouseenter="mouse_in_cell($event)"
              @mousedown="openEditModal"
              ><v-icon>fas fa-plus</v-icon>
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
            <v-sheet
              outlined
              elevation="2"
              v-for="i in grade.grades"
              :key="i.student"
              :student="i.student"
              :col="idx"
              :row="i.student - 1"
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
              @mouseenter="mouse_in_cell($event)"
              >{{ i.grade }}</v-sheet
            >
          </div>
          <div v-for="i in num_of_empty_cols" :key="grades.length + i - 1">
            <v-sheet
              outlined
              elevation="2"
              v-for="j in students.length"
              :key="j - 1 + ',' + (grades.length + i - 1)"
              :student="j + 1"
              :col="grades.length + i - 1"
              :row="j - 1"
              class="pa-2 d-flex justify-center align-center no-select empty clickable"
              :height="size_of_empty_col"
              :width="size_of_empty_col"
              @mousedown="setGrade"
              @mouseenter="mouse_in_cell($event)"
              @mouseleave="mouse_in_cell($event)"
              ><v-icon>fas fa-plus</v-icon></v-sheet
            >
          </div>
        </div>
        <div style="grid-area: fn">
          <v-sheet
            outlined=""
            elevation="2"
            class="px-3 py-2 grade-name final"
            :width="width_of_grade_column"
            :col="grades.length + num_of_empty_cols"
            @mouseenter="mouse_in_cell($event)"
            >Ocena końcowa</v-sheet
          >
        </div>
        <div style="grid-area: fg">
          <div>
            <v-sheet
              outlined=""
              elevation="2"
              class="final d-flex justify-center align-center"
              v-for="(i, idx) in final_grades"
              :key="'final-' + i.id"
              :row="idx"
              :col="grades.length + num_of_empty_cols"
              :class="{
                clickable:
                  (current_grade !== 'pointer' && i.grade !== null) ||
                  (i.grade === null && current_grade !== 'trash'),
                'not-final': !i.final
              }"
              height="42"
              :width="width_of_grade_column"
              @mouseenter="mouse_in_cell($event)"
              @mousedown="setFinalGrade($event)"
              >{{ i.grade }}</v-sheet
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
    <div ref="modalContainer">
      <component
        v-if="show_modal"
        :is="modal"
        v-bind="modal_data"
        @close-modal="closeEditModal"
        @save="saveColumn"
      ></component>
    </div>
  </v-container>
</template>

<script>
import Selector from "@/components/Selector";
import EditColDialog from "@/components/EditColDialog";
import $ from "jquery";

// const GRADE_CONVERSION = {
//     "1": 1,
//     "2": 2,
//     "3": 3,
//     "4": 4,
//     "5": 5,
//     "6": 6,
//     "-2": 1.75,
//     "-3": 2.75,
//     "-4": 3.75,
//     "-5": 4.75,
//     "=2": 1.5,
//     "=3": 2.5,
//     "=4": 3.5,
//     "=5": 4.5,
//     "+2": 2.25,
//     "+3": 3.25,
//     "+4": 4.25,
//     "+5": 5.25,
//     "+": null,
//     "-": null,
//     "N": null,
//     "0": null,
// }

const ACCEPTED_FINAL_GRADES = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  "-2": false,
  "-3": false,
  "-4": false,
  "-5": false,
  "=2": false,
  "=3": false,
  "=4": false,
  "=5": false,
  "+2": false,
  "+3": false,
  "+4": false,
  "+5": false,
  "+": false,
  "-": false,
  N: false,
  0: false
};

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
    num_of_empty_cols: 1,
    scroll_pos: 0,
    highlight_row: null,
    highlight_col: null,
    edit_modal_open: false,
    editing_column: null,
    modal: "",
    show_modal: false,
    modal_data: {}
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
      handler() {
        let key = `${this.$route.params.class_name}`;
        // if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(this.students));
        // }
      }
    },
    grades: {
      deep: true,
      handler() {
        let key = `${this.$route.params.class_name}-${this.$route.params.subject}`;
        // if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(this.grades));
        // }
      }
    },
    final_grades: {
      deep: true,
      handler() {
        if (!this.final_grades) {
          this.final_grades = this.initFinalGrades();
        }
        let key = `${this.$route.params.class_name}-${this.$route.params.subject}-finals`;
        localStorage.setItem(key, JSON.stringify(this.final_grades));
      }
    },
    highlight_row(val, oldVal) {
      $(`*[row="${oldVal}"]`).removeClass("on-hover");
      $(`*[row="${val}"]`).addClass("on-hover");
      $(`*[col="${this.highlight_col}"]`).addClass("on-hover");
    },
    highlight_col(val, oldVal) {
      $(`*[col="${oldVal}"]`).removeClass("on-hover");
      $(`*[col="${val}"]`).addClass("on-hover");
      $(`*[row="${this.highlight_row}"]`).addClass("on-hover");
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
        this.final_grades = this.initFinalGrades();
      } else {
        this.final_grades = JSON.parse(t);
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
    },
    setGrade(event) {
      if (this.current_grade === "pointer") return;
      let t = event.target;
      let student = parseInt(t.getAttribute("row"));
      let grade_column = parseInt(t.getAttribute("col"));
      if (this.current_grade === "trash") {
        this.grades[grade_column].grades[student].grade = null;
      } else {
        this.grades[grade_column].grades[student].grade = this.current_grade;
      }
    },
    setFinalGrade(event) {
      if (this.current_grade === "pointer") return;
      let t = event.target;
      let student = parseInt(t.getAttribute("row"));
      if (this.current_grade === "trash") {
        this.final_grades[student].grade = null;
        this.final_grades[student].final = false;
      } else {
        if (!ACCEPTED_FINAL_GRADES[this.current_grade]) return;
        if (this.current_grade == this.final_grades[student].grade) {
          this.final_grades[student].final = true;
        } else {
          this.final_grades[student].final = false;
        }
        this.final_grades[student].grade = this.current_grade;
      }
    },
    resetData() {
      const fetchClassName = this.$route.params.class_name;
      const fetchSubject = this.$route.params.subject;

      localStorage.removeItem(`${fetchClassName}`);
      localStorage.removeItem(`${fetchClassName}-${fetchSubject}`);
      localStorage.removeItem(`${fetchClassName}-${fetchSubject}-final`);
      this.fetchData();
      this.calc_num_of_empty_columns();
    },
    initFinalGrades() {
      let arr = [];
      let len = this.students.length;
      for (let i = 0; i < len; i++) {
        arr.push({ id: i + 1, grade: null, final: false });
      }
      return arr;
    },
    scrollTo(src_event, dst_ref) {
      let dst = this.$refs[dst_ref];
      // console.log(dst);
      let pos = src_event.target.scrollLeft;
      dst.scrollLeft = pos;
    },
    calc_num_of_empty_columns() {
      let nameRow = this.$refs["nameRow"];
      let space_used_by_existing_grades =
        this.grades.length * this.width_of_grade_column;
      let space_left = nameRow.clientWidth - space_used_by_existing_grades;
      let columns = Math.ceil(space_left / this.size_of_empty_col);
      // this.num_of_empty_cols = columns > 0 ? columns : 1;
      this.num_of_empty_cols = Math.max(columns, this.num_of_empty_cols);
    },
    mouse_in_cell(event) {
      let src = event.target;
      let t;
      if ((t = src.attributes.row) !== undefined) {
        t = parseInt(t.value);
        if (t !== this.highlight_row) {
          this.highlight_row = t;
        }
      } else {
        this.highlight_row = null;
      }
      if ((t = src.attributes.col) !== undefined) {
        t = parseInt(t.value);
        if (t !== this.highlight_col) {
          this.highlight_col = t;
        }
      } else {
        this.highlight_col = null;
      }
    },
    isNameUnique(value) {
      if (this.editing_column && this.editing_column.name == value) return true;
      for (let i of this.grades) {
        if (i.name === value) return false;
      }
      return true;
    },
    // eslint-disable-next-line no-unused-vars
    openEditModal(edit_col) {
      if (edit_col) {
        this.editing_column = this.grades[edit_col];
      }
      this.show_modal = true;
      this.modal_data = {
        active: this.show_modal,
        title: this.editing_column ? "Edytuj kolumnę" : "Dodaj nową kolumnę",
        suggestions: this.name_suggestions,
        validator: this.isNameUnique,
        data: this.editing_column
      };
      this.modal = "edit-col-dialog";
    },
    closeEditModal() {
      this.show_modal = false;
      this.modal = null;
      this.modal_data = {};
    },
    addNewGradeColumn(data) {
      let grades = Object.assign(this.grades);
      let new_col = data;
      new_col.grades = [];
      for (let i = 1; i < this.students.length + 1; ++i) {
        new_col.grades.push({ student: i, grade: null });
      }
      grades.push(new_col);
      this.grades = grades.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    },
    saveColumn(data) {
      if (this.editing_column) {
        this.editing_column.name = data.name;
        this.editing_column.weight = data.weight;
        this.editing_column.description = data.description;
        this.editing_column = null;
      } else {
        this.addNewGradeColumn(data);
      }
    }
  },
  computed: {
    name_suggestions() {
      let out = [];
      for (let i of this.grades) {
        out.push(i.name.replace(/\s*\d*$/, ""));
      }
      return out;
    }
  },
  mounted: function () {
    window.addEventListener("resize", this.calc_num_of_empty_columns);
    this.calc_num_of_empty_columns();
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.calc_num_of_empty_columns);
  },
  components: { Selector, EditColDialog }
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

.on-hover,
.on-hover > * {
  background-color: #eeeeee !important;
}

.final.on-hover,
.final.on-hover > * {
  background-color: #ffcdd2 !important;
}

.not-final {
  color: rgb(131, 131, 131) !important;
}

.empty > i {
  opacity: 0;
}

.empty:hover > i {
  opacity: 1;
}
</style>
