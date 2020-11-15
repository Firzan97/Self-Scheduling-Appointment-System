<template>
  <div>
    <div>
      <h1>Update Appointment</h1>
      <v-col cols="12" sm="6" md="4">
        Type
        <v-text-field v-model="type" solo dense></v-text-field>
        Cost
        <v-text-field v-model="cost" solo dense></v-text-field>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateAppointment",
  components: {},
};
</script>

<style scoped></style>
