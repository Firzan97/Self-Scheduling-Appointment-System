<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer app>
      <!-- -->
      <v-card class="mx-auto" max-width="300" tile>
        <v-list>
          <v-subheader>MENU</v-subheader>

          <v-list dense nav>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="changeMenu(item.text)"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar color="blue" app>
      <!-- -->
      <span class="mr-2">Home</span>
      <v-spacer></v-spacer>
      <v-btn @click="logout" target="_blank" text>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
        <span class="mr-2">Logout</span>
      </v-btn>
      <v-avatar>
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->

      <AppointmentTable v-if="currentMenu == 1" />
      <Service v-if="currentMenu == 2" />
      <PatientTable v-if="currentMenu == 3" />
      <DoctorTable v-if="currentMenu == 4" />

      <router-view> </router-view>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
import AppointmentTable from "../../components/Appointment";
import DoctorTable from "../../components/Doctor";
import PatientTable from "../../components/Patient";
import Service from "../../components/Service";

export default {
  components: {
    AppointmentTable,
    DoctorTable,
    PatientTable,
    Service,
  },
  data: () => ({
    currentMenu: 1,
    appointment: [],
    doctor: [],
    patient: [],
    service: [],
    doctorName: "",
    serviceType: "",
    patientName: "",
    selectedItem: 0,
    status: [
      { text: "Accepted", value: "accepted" },
      { text: "Rejected", value: "rejected" },
      { text: "Pending", value: "pending" },
    ],
    items: [
      { text: "Appointments", icon: "mdi-clock", link: "/profile" },
      { text: "Services", icon: "mdi-account", link: "Profile" },
      { text: "Patients", icon: "mdi-flag", link: "" },
      { text: "Doctors", icon: "mdi-flag", link: "" },
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
  created() {
    this.getDoctor();
    this.getPatient();
    this.getService();

    this.getAppointment();
    console.log(this.appointment);
    console.log(this.desserts);
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    changeMenu(menuTitle) {
      if (menuTitle == "Appointments") {
        this.currentMenu = 1;
      }
      if (menuTitle == "Services") {
        this.currentMenu = 2;
      }

      if (menuTitle == "Patients") {
        this.currentMenu = 3;
      }
      if (menuTitle == "Doctors") {
        this.currentMenu = 4;
      }
    },
    getAppointment() {
      axios
        .get("https://protected-ravine-72171.herokuapp.com/appointment")
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
        .get("https://protected-ravine-72171.herokuapp.com/user/staff/")
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
        .get("https://protected-ravine-72171.herokuapp.com/service")
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
    getPatient() {
      axios
        .get("https://protected-ravine-72171.herokuapp.com/user/patient/")
        .then((response) => {
          let data = {};
          for (var x = 0; x < response.data.length; x++) {
            data = {
              id: response.data[x].id,
              fullname: response.data[x].fullname,
            };
            this.patient.push(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
td {
  width: 90px;
}
</style>
