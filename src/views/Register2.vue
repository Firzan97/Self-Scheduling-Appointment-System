<template>
  <v-container fluid class="d-flex justify-center">
    <v-col cols="6">
      <form>
        <v-text-field
          v-model="username"
          :error-messages="nameErrors"
          :counter="10"
          label="Username"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          label="Password"
          hint="At least 8 characters"
          value="wqfasds"
          class="input-group--focused"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          label="Confirmation Password"
          hint="At least 8 characters"
          value="wqfasds"
          class="input-group--focused"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-row class="d-flex justify-center">
          <v-btn class="mr-4" @click="submit">
            REGISTER
          </v-btn>
          <v-btn to="/Login">
            LOGIN
          </v-btn>
        </v-row>
      </form>
    </v-col>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
const axios = require("axios");
import router from "../router";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    username: "sasa",
    email: "sasa",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    password: "Password",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
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
    submit() {
      axios
        .post("http://localhost:3000/login", {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then(function(response) {
          if (response.status == 200) {
            router.push({ name: "Profile" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
    // register() {
    //   axios
    //     .post("http://localhost:3000/Register", {
    //       username: this.username,
    //       email: this.email,
    //       pasword: this.password,
    //     })
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
  },
};
</script>

<style scoped>
form {
  margin-top: 14%;
}
</style>
