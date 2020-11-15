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
        Add Staff
      </v-btn>
    </v-col>
    <AddDoctor v-if="menu == 2" />
  </div>
</template>

<script>
import DoctorTable from "../components/DoctorTable";
import AddDoctor from "../components/AddDoctor";
export default {
  name: "Doctor",
  components: {
    DoctorTable,
    AddDoctor,
  },
  created() {
    this.getDoctor();
    this.getPatient();
    this.getService();

    this.getAppointment();
    console.log(this.appointment);
    console.log(this.desserts);
  },
  methods: {
    changeMenu(title) {
      this.$store.commit("updateDoctorMenu", title);
      this.menu = this.$store.getters.doctorMenu;
      console.log(this.menu);
    },
  },
  data: () => ({
    menu: 1,

    status: [
      { text: "Accepted", value: "accepted" },
      { text: "Rejected", value: "rejected" },
      { text: "Pending", value: "pending" },
    ],
    items: [
      { text: "Appointments", icon: "mdi-clock" },
      { text: "Services", icon: "mdi-account" },
      { text: "Patients", icon: "mdi-flag" },
      { text: "Staffs", icon: "mdi-flag" },
    ],
    search: "",
    headers: [
      {
        text: "Date",
        align: "start",
        filterable: false,
        value: "appointmentDate",
      },
      { text: "Time", value: "appointmentTime" },
      { text: "Doctor", value: "appointmentDoctor" },
      { text: "Services", value: "appointmentService" },
      { text: "Patient", value: "appointmentPatient" },
      { text: "Status", value: "appointmentStatus" },

      { text: "Action", value: "appointmentAction" },
    ],
  }),
};
</script>

<style scoped></style>
