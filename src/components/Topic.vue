

<template>

  <v-container class="mt-6">
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
    <v-form @submit.prevent="submit" class="d-flex justify-center">
        <v-col cols="12" sm="8">
        <v-row>
          <v-layout row wrap>
            <v-menu
              v-model="fromDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Podaj datę zajęć"
                  prepend-icon="mdi-calendar"
                  readonly
                  outlined
                  :value="fromDateDisp"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="en-in"
                :min="minDate"
                :max="maxDate"
                v-model="fromDateVal"
                no-title
                @input="fromDateMenu = false"
                :allowed-dates="allowedDates"
              ></v-date-picker>
            </v-menu>
          </v-layout>
        </v-row>
        <validation-provider
          v-slot="{ errors }"
          name="Name"
          rules="required"
        >
        <v-row>

          <v-text-field
            v-model="topicName"
            label="Temat zajęć"
            outlined
            @keydown.enter="submit"
            :error-messages="errors"
            required
          ></v-text-field>
        </v-row>
        </validation-provider>

        <v-row>
          <v-textarea
            v-model="lessonDescription"
            label="Opis"
            outlined
            @keydown.enter="submit"
            :error-messages="usernameErrors"
          ></v-textarea>
        </v-row>
          <validation-provider
            v-slot="{ errors }"
            name="selectedBy"
            rules="required"
          >
        <v-row>
          <v-select
            :items="hournumbers"
            label="Wybierz godzinę lekcyjną"
            outlined
            :disabled="selector"
            v-model="selectedBy"
            data-vv-name="selectedBy"
            :error-messages="errors"
            required
            @keydown.enter="submit"


          ></v-select>
        </v-row>
          </validation-provider>
        <v-row class="d-flex justify-end pt-4">
          <v-btn color="type===primary" @click="submit"
                 :disabled="invalid">Zaloguj</v-btn></v-row
        >
      </v-col>
    </v-form>
    </validation-observer>
  </v-container>
</template>
<script>
import { required, } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')
extend('required', {
  ...required,
  message: '{_field_} nie może być puste',
})
export default {
  data() {
    return {
      fromDateMenu: new Date().toISOString().slice(0,10),
      fromDateVal: null,
      students:null,
      grades:null,
      selector:true,
      hournumbers: [1],
      selectedBy: null,
      topicName:null,
      lessonDescription:null,


      minDate: "2019-07-04",
      maxDate: "2022-08-30",
    };
  },
  methods: {
    created() {
      this.fetchData();
    },


    allowedDates(val) {

      const fetchClassName = this.$route.params.class_name;
      const fetchSubject = this.$route.params.subject;
      var schedule=[]
      if(fetchClassName==="1a"&&fetchSubject=="jpolski"){
        schedule.push(1);
        schedule.push(2);
        schedule.push(3);
        schedule.push(4);

      }
      if(fetchClassName==="1b"&&fetchSubject=="jpolski"){
        schedule.push(1);
        schedule.push(2);
        schedule.push(5);
        schedule.push(4);

      }
      if(fetchClassName==="3b"&&fetchSubject=="jpolski"){
        schedule.push(1);
        schedule.push(2);
        schedule.push(3);
        schedule.push(5);

      }
      if(fetchClassName==="3c"&&fetchSubject=="jpolski"){
        schedule.push(5);
        schedule.push(2);
        schedule.push(3);
        schedule.push(4);

      }
      if(fetchClassName==="1a"&&fetchSubject=="informatyka"){
        schedule.push(1);
        schedule.push(2);


      }
      if(fetchClassName==="1b"&&fetchSubject=="informatyka"){
        schedule.push(1);


      }
      if(fetchClassName==="1c"&&fetchSubject=="informatyka"){
        schedule.push(2);


      }      if(fetchClassName==="1d"&&fetchSubject=="informatyka"){
        schedule.push(3);


      }      if(fetchClassName==="1e"&&fetchSubject=="informatyka"){
        schedule.push(2);


      }      if(fetchClassName==="1f"&&fetchSubject=="informatyka"){
        schedule.push(4);


      }      if(fetchClassName==="2a"&&fetchSubject=="informatyka"){
        schedule.push(3);


      }      if(fetchClassName==="3a"&&fetchSubject=="informatyka"){
        schedule.push(2);


      }
      var i;
      var g=false;
      var j=new Date(val).getDay()
      for (i = 0; i < schedule.length; i++) {
        if (schedule[i] === j) {
          g= true;
        }
      }

      return  g;},

    submit() {

      this.$refs.observer.validate()
      this.$router.push({ name: "classPage" });
    },


  },watch:{
    fromDateVal:function(val1){
      this.selector=false
      if(new Date(val1).getDate()%2===0){
        this.hournumbers=[1,2]
      }else {
        this.hournumbers=[1]
      }
    }


  },
  computed: {
    fromDateDisp() {





      return this.fromDateVal;
      // format date, apply validations, etc. Example below.
      // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
};
</script>
