<template>
  <div>
    <PatientTable v-if="menu == 1" />
    <v-col v-if="menu == 1" class="text-right">
      <v-btn
        depressed
        color="primary"
        class=" caption mr-4"
        @click="changeMenu(2)"
      >
        Add Patient
      </v-btn>
    </v-col>
    <AddPatient v-if="menu == 2" />
  </div>
</template>

<script>
import PatientTable from "../components/PatientTable";
import AddPatient from "../components/AddPatient";
import axios from "axios";

export default {
  name: "Patient",
  components: {
    PatientTable,
    AddPatient,
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
      this.$store.commit("updatePatientMenu", title);
      this.menu = this.$store.getters.patientMenu;
      console.log(this.menu);
    },
    getAppointment() {
      axios
        .get("https://protected-ravine-72171.herokuapp.com/Appointment")
        .then((response) => {
          let data = {};
          for (var x = 0; x < response.data.length; x++) {
            for (var i = 0; i < this.doctor.length; i++) {
              if ((response.data[x].doctorId = this.doctor[i].id)) {
                this.doctorName = this.doctor[i].fullname;
              }
            }
            for (i = 0; i < this.patient.length; i++) {
              if ((response.data[x].UserId = this.patient[i].id)) {
                this.patientName = this.patient[i].fullname;
              }
            }
            for (i = 0; i < this.service.length; i++) {
              if ((response.data[x].ServiceId = this.service[i].id)) {
                this.serviceType = this.service[i].type;
              }
            }

            data = {
              appointmentTime: response.data[x].regTime,
              appointmentDate: response.data[x].regDate.slice(0, 10),
              appointmentStatus: response.data[x].status,
              appointmentService: this.serviceType,
              appointmentPatient: this.patientName,
              appointmentDoctor: "Dr. " + this.doctorName,
            };
            this.appointment.push(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDoctor() {
      axios
        .get("https://protected-ravine-72171.herokuapp.com/User/Docotr/")
        .then((response) => {
          let data = {};
          for (var x = 0; x < response.data.length; x++) {
            data = {
              id: response.data[x].id,
              fullname: response.data[x].fullname,
            };
            this.doctor.push(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getService() {
      axios
        .get("https://protected-ravine-72171.herokuapp.com/Service")
        .then((response) => {
          let data = {};
          for (var x = 0; x < response.data.length; x++) {
            data = {
              id: response.data[x].id,
              type: response.data[x].type,
            };
            this.service.push(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data: () => ({
    appointment: [],
    doctor: [],
    patient: [],
    service: [],
    doctorName: "",
    serviceType: "",
    patientName: "",
    selectedItem: 0,
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
