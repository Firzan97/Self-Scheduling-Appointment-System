<template>
  <div>
    <AppointmentTable v-if="menu == 1" />
    <!-- <v-col v-if="menu == 1" class="text-right">
      <v-btn
        depressed
        color="primary"
        class=" caption mr-4"
        @click="changeMenu(2)"
      >
        Add Patient
      </v-btn>
    </v-col> -->
    <!-- <AddAppointment v-if="menu == 2" /> -->
  </div>
</template>

<script>
import AppointmentTable from "../components/AppointmentTable";
// import AddAppointment from "../components/AddAppointment";
export default {
  name: "Appointment",
  components: {
    AppointmentTable,
    // AddAppointment,
  },
  data() {
    return {
      menu: 1,
    };
  },
  methods: {
    changeMenu(title) {
      this.$store.commit("updateAppointmentMenu", title);
      this.menu = this.$store.getters.appointmentMenu;
      console.log(this.menu);
    },
  },
};
</script>

<style scoped></style>
