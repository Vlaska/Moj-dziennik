<template>
  <v-container>
    <v-row class="d-flex mt-10 mb-5 flex-column justify-center align-center">
      <p class="display-2">Oceny</p>
      <p class="display-1">
        Klasa {{ class_name($route.params.class_name) }} &mdash;
        {{ subject_codes[$route.params.subject] }}
      </p>
    </v-row>
    <div v-if="students" class="content">
      <p>{{ students }}</p>
    </div>
    <div v-if="grades" class="content">
      <p>{{ grades }}</p>
    </div>
    <v-row>
      <v-container fluid>
        <table></table>
      </v-container>
    </v-row>
    <div class="grade-selector">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            min-width="44"
            width="44"
            outlined
            elevation="1"
            class="mr-3"
            style="font-size: 20px"
            :class="
              current_grade !== 'trash'
                ? 'cyan--text text--darken-4'
                : 'red--text text--accent-4'
            "
            large
            v-bind="attrs"
            v-on="on"
            @click="resetCurrentGrade"
            :color="
              current_grade !== 'trash' ? 'cyan lighten-4' : 'red lighten-4'
            "
          >
            <span v-if="current_grade == 'pointer'"
              ><v-icon>fas fa-mouse-pointer</v-icon></span
            >
            <span v-else-if="current_grade == 'trash'"
              ><v-icon>far fa-trash-alt</v-icon></span
            >
            <span v-else>
              {{ current_grade }}
            </span>
          </v-btn>
        </template>
        <span>Naciśnij mnie, aby zresetować ocenę.</span>
      </v-tooltip>
      <v-menu
        offset-y
        top
        left
        open-on-hover
        :close-on-click="false"
        :close-on-content-click="false"
        :close-delay="200"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="success" v-bind="attrs" v-on="on" large>Oceny</v-btn>
        </template>
        <v-sheet
          max-width="fit-content"
          outlined
          rounded
          color="indigo lighten-5"
        >
          <v-container class="d-flex flex-column" style="width: 100%">
            <div v-for="(i, idx) in types_of_grades" :key="idx" class="grid">
              <v-btn
                outlined
                elevation="1"
                v-for="j in i"
                :key="j"
                class="grade-btn"
                width="36"
                style="font-size: 20px"
                @click="setCurrentGrade(j)"
                :color="j == current_grade ? 'cyan lighten-4' : 'normal'"
                :class="current_grade === j ? 'cyan--text text--darken-4' : ''"
                >{{ j }}</v-btn
              >
            </div>
            <div class="grid">
              <v-btn
                outlined
                elevation="1"
                class="grade-btn"
                width="36"
                @click="setCurrentGrade('pointer')"
                :color="
                  'pointer' == current_grade ? 'cyan lighten-4' : 'normal'
                "
                :class="
                  current_grade === 'pointer' ? 'cyan--text text--darken-4' : ''
                "
                ><v-icon>fas fa-mouse-pointer</v-icon></v-btn
              >
              <v-btn
                outlined
                elevation="1"
                class="grade-btn red--text text--accent-4"
                width="36"
                @click="setCurrentGrade('trash')"
                color="red lighten-4"
                ><v-icon>far fa-trash-alt</v-icon></v-btn
              >
            </div>
          </v-container>
        </v-sheet>
      </v-menu>
    </div>
  </v-container>
</template>

<script>
// import axios from "axios";

export default {
  data: () => ({
    students: null,
    grades: null,
    types_of_grades: [
      ["1"],
      ["2", "2-", "2=", "2+"],
      ["3", "3-", "3=", "3+"],
      ["4", "4-", "4=", "4+"],
      ["5", "5-", "5=", "5+"],
      ["6"],
      ["+", "-", "N"]
    ],
    current_grade: "pointer",
    grade_button_icon: "up"
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
    current_grade: function (val) {
      this.$emit("option_changed", val);
    }
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      const fetchClassName = this.$route.params.class_name;
      const fetchSubject = this.$route.params.subject;
      this.students = require(`@/klasy/${fetchClassName}/${fetchClassName}.json`);
      this.grades = require(`@/klasy/${fetchClassName}/${fetchSubject}.json`);
    },
    setCurrentGrade(grade) {
      this.current_grade = grade;
    },
    resetCurrentGrade() {
      this.current_grade = "pointer";
    }
  }
};
</script>

<style>
.grade-btn {
  min-width: 36px !important;
  max-width: 36px !important;
}

.grid {
  display: grid;
  grid-template-columns: 36px 36px 36px 36px;
  /* grid-template-columns: repeat(auto-fit, 36px); */
  grid-gap: 0.5em;
}

.grid:not(:last-child) {
  padding-bottom: 0.5em;
}

.grade-selector {
  display: flex;
  flex-direction: row;
  position: fixed;
  right: 50px;
  bottom: 50px;
}
</style>
