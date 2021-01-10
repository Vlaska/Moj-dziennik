<template>
  <v-col>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <v-select
          class="d-flex justify-center"
          label="Statystyka"
          v-model="selected"
          outlined
          :items="items"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <div class="d-flex justify-center mt-10 mx-auto">
        <line-chart :chart-data="datacollection"></line-chart>
      </div>
    </v-row>
  </v-col>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      options2: {
        responsive: false,
        scales: {
          xAxes: [
            {
              ticks: {
                maxRotation: 90,
                minRotation: 80
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
                stepSize: 20
              }
            }
          ]
        }
      },
      selected: "Liczba ocen",
      mySelected: null,
      students: null,
      grades: null,
      datacollection: null,
      items: ["Liczba ocen"]
    };
  },
  props: {
    options: Array,
    name: String
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.fillData();
  },
  watch: {
    selected: function () {
      this.fillData();
    },
    $route: "fetchData",
    final_grade_alg: "saveFinalGradeSettings",
    calc_final_grades: "saveFinalGradeSettings",
    gradeNames: {
      deep: true,
      handler() {
        console.log("init");
      }
    },
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
        if (this.calc_final_grades) {
          this.calcAllFinalGrades();
        }
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
      let final_grades_key = `${fetchClassName}-${fetchSubject}-finals`;
      let final_grades_settings = `${fetchClassName}-${fetchSubject}-settings`;
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

      if (!(t = localStorage.getItem(final_grades_settings))) {
        this.final_grade_alg = "wa";
        this.calc_final_grades = false;
      } else {
        t = JSON.parse(t);
        this.final_grade_alg = t.final_grade_alg;
        this.calc_final_grades = t.calc_final_grades;
      }
    },
    fillData() {
      var subjects = this.oldgetArrayX();
      for (var x = 0; x < subjects.length; x++) {
        if (!this.inArray(this.items, subjects[x])) {
          this.items.push(subjects[x]);
        }
      }
      this.datacollection = {
        labels: this.getArrayX(),
        datasets: [
          {
            label: "Liczba ocen",
            backgroundColor: "#f87979",
            data: this.getArrayY()
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    inArray(myArray, str) {
      for (var x = 0; x < myArray.length; x++) {
        if (myArray[x] === str) {
          return true;
        }
      }
      return false;
    },
    findLocation(myArray, str) {
      for (var x = 0; x < myArray.length; x++) {
        if (myArray[x] === str) {
          return x;
        }
      }
      return -1;
    },
    oldgetArrayX() {
      var owoce = [];

      for (var x = 0; x < this.grades.length; x++) {
        owoce.push(this.grades[x].name);
      }

      return owoce;
    },
    getArrayX() {
      var owoce = [];
      if (this.selected === "Liczba ocen") {
        for (var x = 0; x < this.grades.length; x++) {
          owoce.push(this.grades[x].name);
        }
      } else {
        for (var x2 = 0; x2 < this.grades.length; x2++) {
          if (this.grades[x2].name == this.selected) {
            for (var y = 0; y < this.grades[x2].grades.length; y++) {
              if (
                !this.inArray(owoce, this.grades[x2].grades[y].grade) &&
                !(this.grades[x2].grades[y].grade === null)
              ) {
                owoce.push(this.grades[x2].grades[y].grade);
              }
            }
          }
        }
        owoce.sort();
      }
      return owoce;
    },
    getArrayY() {
      var counter = 0;
      var owoce = [];
      if (this.selected === "Liczba ocen") {
        for (var x = 0; x < this.grades.length; x++) {
          for (var y = 0; y < this.grades[x].grades.length; y++) {
            if (!(this.grades[x].grades[y].grade === null)) {
              counter++;
            }
          }
          owoce.push(counter);
          counter = 0;
        }
        return owoce;
      } else {
        var owoce2 = [];
        for (var x2 = 0; x2 < this.grades.length; x2++) {
          if (this.grades[x2].name == this.selected) {
            for (var y3 = 0; y3 < this.grades[x2].grades.length; y3++) {
              if (
                !this.inArray(owoce2, this.grades[x2].grades[y3].grade) &&
                !(this.grades[x2].grades[y3].grade === null)
              ) {
                owoce2.push(this.grades[x2].grades[y3].grade);
              }
            }
          }
        }
        owoce2.sort();
        for (var i = 0; i < owoce2.length; i++) {
          owoce.push(0);
        }
        for (var x3 = 0; x3 < this.grades.length; x3++) {
          if (this.grades[x3].name == this.selected) {
            for (var y2 = 0; y2 < this.grades[x3].grades.length; y2++) {
              if (!(this.grades[x3].grades[y2].grade === null)) {
                owoce[
                  this.findLocation(owoce2, this.grades[x3].grades[y2].grade)
                ] += 1;
              }
            }
          }
        }

        return owoce;
      }
    }
  }
};
</script>
