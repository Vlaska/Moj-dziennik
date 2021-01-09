<template>
  <div>
    <title-of-page :prevBtn="false" title="Reset hasła" />
    <v-container>
      <v-form @submit.prevent class="d-flex justify-center">
        <v-col cols="12" sm="8">
          <v-row class="mt-4">
            <p v-if="!showMsg">Aby zrestować hasło, podaj adres e-mail przypisany do konta.</p>
            <p v-if="showMsg">Link do resetu hasła został wysłany na podany adres e-mail.</p>
          </v-row>
          <v-row class="mt-6" v-if="!showMsg">
            <v-text-field
              v-model="email"
              outlined
              label="Adres e-mail"
              required
              autocomplete="email"
              :error-messages="emailErrors"
              @keyup.enter="submit"
            ></v-text-field>
          </v-row>
          <v-spacer></v-spacer>
          <v-row class="d-flex justify-end pt-4" v-if="!showMsg">
            <v-btn color="primary" @click="submit">Zatwierdź</v-btn></v-row
          >
        </v-col>
      </v-form>
      <div class="text-center mt-6">
        <p class="mb-1">
          Pamiętasz swoje hasło?
          <router-link :to="{ name: 'login' }">Zaloguj się.</router-link>
        </p>
      </div>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import TitleOfPage from '@/components/TitleOfPage.vue';

export default {
  components: { TitleOfPage },
  mixins: [validationMixin],
  data: () => ({
    showMsg: false,
    email: ""
  }),
  validations: {
    email: {
      required,
      email
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Adres e-mail jest wymagany.");
      !this.$v.email.email &&
        errors.push("Podany adres nie jest poprawnym adresem e-mail.");
      this.$v.email.$reset();
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.email.$touch();
      if (this.$v.$invalid) return;
      this.showMsg = true;
      // this.$store.commit("logIn");
      // this.$router.push({ name: "mainPage" });
    }
  }
};
</script>
