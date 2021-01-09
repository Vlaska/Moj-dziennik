<template>
  <v-container>
    <title-of-page title="Uwagi" />

    <v-row class="d-flex justify-center">
      <v-container fluid class="d-flex justify-center my-2 py-0">
        <v-col cols="12" sm="8">
          <v-row>
            <v-select
              v-model="selectedClassValue"
              :items="classes"
              outlined
              dense
              label="Klasa"
            ></v-select>
          </v-row>
          <div v-if="selectedClass !== ''">
            <v-row></v-row>
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
      "Ia",
      "Ib",
      "Ic",
      "Id",
      "Ie",
      "If",
      "IIa",
      "IIIa",
      "IIIb",
      "IIIc"
    ],
    selectedClassValue: "",
    selectedClass: "",
    students: [],
    selected_student: 0,
    notes: []
  }),
  components: {
    TitleOfPage
  },
  watch: {
    selectedClassValue() {
      this.selectedClass = this.name_to_class(this.selectedClassValue);
      if (this.selectedClass === this.$route.params.class_name) return;
      this.$router.replace({
        name: "notes",
        params: { class_name: this.selectedClass }
      });
    },
    selectedClass() {}
  },
  methods: {
    class_name(val) {
      return class_name(val);
    },
    name_to_class(value) {
      return "" + (value.length - 1) + value[value.length - 1];
    }
  },
  mounted() {
    let initClass = this.$route.params.class_name;
    if (initClass !== undefined) {
      this.selectedClassValue = class_name(initClass);
    }
  }
};
</script>

<style>
</style>
