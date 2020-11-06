<template>
  <div>
    <v-card
      class="d-flex justify-space-around mt-10"
      :color="'white'"
      flat
      tile
    >
      <v-col cols="16" sm="6" md="3">
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="IC Number"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="Telephones"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-select :items="this.services" label="Services" dense solo></v-select>

        <v-btn @click="clear">
          clear
        </v-btn>
      </v-col>

      <v-col cols="3">
        <v-date-picker v-model="picker" elevation="15"></v-date-picker>
      </v-col>
    </v-card>
    <v-card
      class="d-flex justify-space-around mt-10"
      :color="'white'"
      flat
      tile
    >
    </v-card>
    <v-col cols="10">
      <v-card class="d-flex justify-end mt-10 " :color="'white'" flat tile>
        <v-btn class="mr-4" @click="submit">
          Cancel Appointment
        </v-btn>
        <v-btn @click="this.proceed">
          Proceed
        </v-btn>
      </v-card>
    </v-col>
  </div>
</template>

<script>
// import router from "../router/index";
export default {
  data() {
    return {
      services: ["dentist", "radiology", "psychiatry"],
    };
  },
  methods: {
    proceed() {
      this.$router.push("/selectDoctor");
    },
  },
};
</script>

<style scoped></style>
