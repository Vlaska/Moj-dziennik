<template>
  <v-container>
    <v-form @submit.prevent>
      <v-col cols="12" sm="8">
        <v-row>
          <v-text-field
            v-model="username"
            label="Nazwa użytkownika"
            required
            autocomplete="username"
            :error-messages="usernameErrors"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            label="Hasło"
            required
            type="password"
            autocomplete="current-password"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
        </v-row>
        <v-row></v-row>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: ""
  }),
  computed: {
    usernameErrors() {
      const errors = [];
    //   if (!this.$v.name.$dirty) return errors;
      // !this.$v.name.length < 5 && errors.push("Nazwa użytkownika musi się składać z conajmniej 5 znaków")
      // !this.$v.name.length && errors.push("Nazwa użytkownika musi się składać z conajmniej 5 znaków")
    //   !this.$v.username.required && errors.push("Name is required.");
      return errors;
    }
  }
};
</script>
