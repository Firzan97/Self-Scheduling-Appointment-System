<template>
  <div>
    <h1>Update Doctor</h1>
    <v-col cols="12" sm="6" md="4">
      Username
      <v-text-field
        @change="updateData()"
        v-model="data.username"
        solo
        dense
      ></v-text-field>
      Email
      <v-text-field
        @change="updateData()"
        v-model="data.email"
        solo
        dense
      ></v-text-field>
      Fullname
      <v-text-field
        @change="updateData()"
        v-model="data.fullname"
        solo
        dense
      ></v-text-field>
      Phonenumber
      <v-text-field
        @change="updateData()"
        v-model="data.phonenumber"
        solo
        dense
      ></v-text-field>
      Age
      <v-text-field
        @change="updateData()"
        v-model="data.age"
        solo
        dense
      ></v-text-field>
      Password
      <v-text-field
        @change="updateData()"
        v-model="data.password"
        solo
        dense
      ></v-text-field>
      Speciality
      <v-text-field
        @change="updateData()"
        v-model="data.speciality"
        solo
        dense
      ></v-text-field>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "UpdatedDoctor",
  props: ["doctor"],
  data() {
    return {
      data: {
        username: "",
        email: "",
        role: "",
        fullname: "",
        phonenumber: "",
        age: 0,
        password: "",
        speciality: "",
      },
    };
  },
  created() {
    console.log(this.doctor);
    this.data = this.doctor;
  },
  methods: {
    updateData() {
      this.$store.commit("updateDoctor", this.data);
    },
  },
};
</script>

<style scoped></style>
