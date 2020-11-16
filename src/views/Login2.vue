<template>
  <v-container fluid class="d-flex justify-center">
    <v-col cols="6">
      <form @submit.prevent="login">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show3 ? 'text' : 'password'"
          name="input-10-2"
          label="Not visible"
          hint="At least 8 characters"
          v-model="password"
          class="input-group--focused"
          @click:append="show3 = !show3"
        ></v-text-field>
        <v-row class="d-flex justify-center">
          <v-btn class="mr-4" type="submit">
            LOGIN
          </v-btn>
          <v-btn to="/Register">
            REGISTER
          </v-btn>
        </v-row>
      </form>
    </v-col>
  </v-container>
</template>

<script>
// const axios = require("axios");
// import router from "../router";

export default {
  data: () => ({
    user: "",
    name: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    login() {
      console.log(this.email + "dannnn" + this.password);
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
  },
  created() {
    console.log(this.$store.getters.checkToken);

    if (this.$store.getters.checkToken !== null) {
      this.$router.push("/profile");
    }
  },
};
</script>

<style scoped>
form {
  margin-top: 14%;
}
</style>
