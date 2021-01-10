<template>


  <div class="small">


    <line-chart :chart-data="datacollection"></line-chart>


  </div>


</template>

<script>
import LineChart from './LineChart.js'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      mySelected: null,
      students: null,
      grades: null,
      datacollection: null
    }
  },
  props: {
    options: Array,
    name: String
  },
  created() {
    this.fetchData();
  },
  mounted () {
    this.fillData()
  },  watch: {
    $route: "fetchData",
    final_grade_alg: "saveFinalGradeSettings",
    calc_final_grades: "saveFinalGradeSettings",
    gradeNames:{
      deep: true,
      handler(){
        console.log('init');
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
    },


  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading  = true;
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
    fillData () {
      this.datacollection = {
        labels: this.getArrayX(),
        datasets: [
          {
            label: 'liczba ocen',
            backgroundColor: '#f87979',
            data: this.getArrayY(),
          },
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getArrayX(){
      var owoce = [];
      for (var x=0;x< this.grades.length;x++){
        owoce.push(this.grades[x].name)

      }
      return owoce
    },
    getArrayY(){
      var counter=0;
      var owoce = [];
      for (var x=0;x< this.grades.length;x++){
        for (var y=0;y<this.grades[x].grades.length;y++){
          if(!(this.grades[x].grades[y].grade===null)){
            counter++;
          }
        }
        owoce.push(counter)
        counter=0;

      }
      return owoce

    }
  }
}
</script>

<style scoped>
.small {
  max-width: 600px;
  margin:  150px auto;
}
</style>
