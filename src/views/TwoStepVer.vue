<template>
  <div>
    <div class="d-flex justify-center mt-10">
      <p class="display-2">Weryfikacja dwuetapowa</p>
    </div>
    <v-container>
      <v-form @submit.prevent class="d-flex justify-center">
        <v-col cols="12" sm="8">
          <v-row class="mt-4">
            <p>
              Próbujesz zalogować się na konto:
              <span class="font-weight-bold">Jan Kowalski - nauczyciel</span>.
            </p>
            <p>
              W celu potwierdzenia tożsamości, wprowadź kod uwierzetelniający
              dostępny na twoim telefonie.
            </p>
          </v-row>
          <v-row class="mt-6">
            <v-text-field
              v-model="code"
              outlined
              label="Kod uwierzytelniający"
              required
              autocomplete="off"
              persistent-hint
              hint="Jeżeli nie masz dostępu do kodów - zgłoś się do administratora."
              :error-messages="codeErrors"
              @keyup.enter="submit"
            ></v-text-field>
          </v-row>
          <v-spacer></v-spacer>
          <v-row class="d-flex justify-end pt-4">
            <v-btn color="primary" @click="submit">Zaloguj</v-btn></v-row
          >
        </v-col>
      </v-form>
      <div class="text-center mt-6">
        <p class="mb-1">To nie twoje konto?</p>
        <p>
          <router-link :to="{ name: 'login' }"
            >Zaloguj się z na inne konto.</router-link
          >
        </p>
      </div>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  numeric
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "Login",
  data: () => ({
    code: ""
  }),
  validations: {
    code: {
      required,
      numeric,
      minLength: minLength(6),
      maxLength: maxLength(6),
      valid() {
        return this.validCode() === this.code;
      }
    }
  },
  computed: {
    codeErrors() {
      const errors = [];
      if (!this.$v.code.$dirty) return errors;
      !this.$v.code.required &&
        errors.push("Kod uwierzytelniający jest wymagane.");
      !this.$v.code.numeric &&
        errors.push("Kod może składać się tylko z cyfr.");
      !this.$v.code.minLength && errors.push("Kod musi składać się z 6 cyfr.");
      !this.$v.code.maxLength && errors.push("Kod musi składać się z 6 cyfr.");
      !this.$v.code.valid &&
        errors.push("Kod uwierzytelniający nie jest poprawny.");
      this.$v.code.$reset();
      return errors;
    }
  },
  methods: {
    validCode() {
      let date = new Date();
      let code =
        "" +
        this.leadingZero(date.getHours()) +
        this.leadingZero(date.getMinutes()) +
        (date.getSeconds() >= 30 ? "30" : "00");

      return code;
    },
    leadingZero(v) {
      return v < 10 ? "0" + v : v;
    },
    submit() {
      this.$v.code.$touch();
      if (this.$v.$invalid) return;
      this.$store.commit("logIn");
      this.$router.push({ name: "mainPage" });
    }
  }
};
</script>
