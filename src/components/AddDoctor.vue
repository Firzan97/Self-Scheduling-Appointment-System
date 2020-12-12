<template>
  <div>
    <DoctorTable v-if="menu == 1" />
    <v-col v-if="menu == 1" class="text-right">
      <v-btn
        depressed
        color="primary"
        class=" caption mr-4"
        @click="changeMenu(2)"
      >
        Add staff
      </v-btn>
    </v-col>
    <div v-if="menu == 2">
      <h1>Add staff</h1>
      <v-col cols="12" sm="6" md="4">
        Username
        <v-text-field v-model="username" solo dense></v-text-field>
        Email
        <v-text-field v-model="email" solo dense></v-text-field>
        Fullname
        <v-text-field v-model="fullname" solo dense></v-text-field>
        Phonenumber
        <v-text-field v-model="phonenumber" solo dense></v-text-field>
        Age
        <v-text-field v-model="age" solo dense></v-text-field>
        Password
        <v-text-field v-model="password" solo dense></v-text-field>
        Speciality
        <v-text-field v-model="speciality" solo dense></v-text-field>
      </v-col>
      <v-btn
        v-if="menu == 2"
        depressed
        color="primary"
        class=" caption mr-4"
        @click="changeMenu(1)"
      >
        Back
      </v-btn>
      <v-btn
        v-if="menu == 2"
        depressed
        color="primary"
        class=" caption mr-4"
        @click="addStaff()"
      >
        Confirm
      </v-btn>
    </div>
  </div>
</template>

<script>
import DoctorTable from "../components/DoctorTable";
import axios from "axios";

export default {
  name: "AddDoctor",
  components: {
    DoctorTable,
  },
  data() {
    return {
      menu: 2,
      username: "",
      email: "",
      role: "",
      fullname: "",
      phonenumber: "",
      age: 0,
      password: "",
      speciality: "",
    };
  },
  created() {},

  methods: {
    changeMenu(title) {
      this.$store.commit("updateDoctorMenu", title);
      this.menu = this.$store.getters.doctorMenu;
      console.log(this.menu);
    },
    addStaff() {
      axios
        .post("https://protected-ravine-72171.herokuapp.com/User/Doctor", {
          username: this.username,
          email: this.email,
          role: "Doctor",
          fullname: this.fullname,
          phonenumber: this.phonenumber,
          age: this.age,
          password: this.password,
          speciality: this.speciality,
        })
        .then((response) => {
          console.log(response);
          this.menu = 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
