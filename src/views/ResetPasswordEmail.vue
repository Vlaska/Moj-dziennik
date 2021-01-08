<template>
  <div>
    <div class="d-flex justify-center mt-10">
      <p class="display-2">Reset hasła</p>
    </div>
    <v-container>
      <v-form @submit.prevent class="d-flex justify-center">
        <v-col cols="12" sm="8">
          <v-row class="mt-4">
            <p v-if="!showMsg">
              Aby zrestować hasło, podaj adres e-mail przypisany do konta.
            </p>
            <p v-if="showMsg">
              Hasło zostało pomyślnie zresetowane. Możesz się zalogować,
              klikając <router-link :to="{ name: 'login' }">tutaj</router-link>.
            </p>
          </v-row>
          <v-row class="mt-6" v-if="!showMsg">
            <v-text-field
              v-model="newPassword"
              outlined
              label="Nowe hasło"
              required
              autocomplete="new-password"
              :error-messages="passwordErrors"
              @keyup.enter="submit"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            ></v-text-field>
          </v-row>
          <v-row class="mt-6" v-if="!showMsg">
            <v-text-field
              v-model="confirmNewPassword"
              outlined
              label="Powtórz nowe hasło"
              required
              autocomplete="new-password"
              :error-messages="confirmPasswordErrors"
              @keyup.enter="submit"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            ></v-text-field>
          </v-row>
          <v-spacer></v-spacer>
          <v-row class="d-flex justify-end pt-4" v-if="!showMsg">
            <v-btn color="primary" @click="submit">Zapisz</v-btn></v-row
          >
        </v-col>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data: () => ({
    showPassword: false,
    showMsg: false,
    newPassword: "",
    confirmNewPassword: ""
  }),
  validations: {
    newPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(30),
      valid() {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
          this.newPassword
        );
      },
      sameAs: sameAs("confirmNewPassword")
    },
    confirmNewPassword: {
      required,
      sameAs: sameAs("newPassword")
    }
  },
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.required && errors.push("To pole jest wymagane.");
      !this.$v.newPassword.minLength &&
        errors.push("Hasło musi składać się z conajmniej 8 znaków.");
      !this.$v.newPassword.maxLength &&
        errors.push("Hasło musi składać się z conajwyżej 30 znaków.");
      !this.$v.newPassword.valid &&
        errors.push(
          "Hasło musi posiadać po jednej: dużej literze, małej literze, cyfrze, znaku specjalnym: #$@!%&*?."
        );
      !this.$v.newPassword.sameAs &&
        errors.push("Nowe hasło oraz jego powtórzenie nie są takie same.");
      this.$v.newPassword.$reset();
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmNewPassword.$dirty) return errors;
      !this.$v.confirmNewPassword.required &&
        errors.push("To pole jest wymagane.");
      !this.$v.confirmNewPassword.sameAs &&
        errors.push("Nowe hasło oraz jego powtórzenie nie są takie same.");

      this.$v.confirmNewPassword.$reset();
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.newPassword.$touch();
      this.$v.confirmNewPassword.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store.commit("changePassword", this.newPassword);
      this.showMsg = true;
    }
  }
};
</script>
