<template>
  <v-container class="mt-6">
    <v-form @submit.prevent class="d-flex justify-center">
      <v-col cols="12" sm="8">
        <v-row>
          <v-text-field
            v-model="username"
            label="Nazwa użytkownika"
            required
            outlined
            autocomplete="username"
            @keydown.enter="submit"
            :error-messages="usernameErrors"
          ></v-text-field>
        </v-row>
        <v-row class="mt-4">
          <v-text-field
            v-model="password"
            label="Hasło"
            required
            outlined
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            :error-messages="passwordErrors"
            @click:append="showPassword = !showPassword"
            @keydown.enter="submit"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            hint="Hasło musi być długości od 8 do 30 znaków oraz posiadać po jednej: dużej literze, małej literze, cyfrze, znaku specjalnym: #$@!%\&*?."
          ></v-text-field>
        </v-row>
        <v-spacer></v-spacer>
        <v-row class="d-flex justify-end pt-4">
          <v-btn color="primary" @click="submit">Zaloguj</v-btn></v-row
        >
      </v-col>
    </v-form>
    <div class="text-center mt-5">
      <p><router-link to="#">Nie pamiętam hasła.</router-link></p>
    </div>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    showPassword: false,
    valid_username: "jkowalski",
    valid_password: "Kowalski!23"
  }),
  validations: {
    username: { required },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(30),
      valid() {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
          this.$data.password
        );
      }
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required &&
        errors.push("Nazwa użytkownika jest wymagana.");
      this.username !== this.valid_username &&
        errors.push("Użytkownik o podanej nazwie nie istnieje.");
      this.$v.username.$reset();
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty || this.$v.username) return errors;
      !this.$v.password.required && errors.push("Hasło jest wymagane.");
      !this.$v.password.minLength &&
        errors.push("Hasło musi składać się z conajmniej 8 znaków.");
      !this.$v.password.maxLength &&
        errors.push("Hasło musi składać się z conajwyżej 30 znaków.");
      !this.$v.password.valid &&
        errors.push(
          "Hasło musi posiadać po jednej: dużej literze, małej literze, cyfrze, znaku specjalnym: #$@!%&*?."
        );
      this.username === this.valid_username &&
        this.password !== this.valid_password &&
        errors.push("Hasło nie jest poprawne.");
      this.$v.password.$reset();
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.username.$touch();
      this.$v.password.$touch();

      if (this.$v.$invalid) return;
      this.$router.push({ name: "2sv" });
    }
  }
};
</script>
