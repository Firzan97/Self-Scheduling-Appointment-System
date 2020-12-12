<template>
  <v-container fluid>
    <!-- If using vue-router -->
    <h1>History</h1>

    <v-row>
      <v-col cols="3">
        <v-menu
          class="pa-2"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="150px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="From"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="2">
        <v-menu
          class="pa-2"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="150px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="To"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="2">
        <v-select
          class="pa-2"
          :items="doctor"
          item-text="fullname"
          item-value="id"
          label="Doctor"
          solo
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          class="pa-2"
          :items="service"
          item-text="type"
          item-value="id"
          label="Services"
          solo
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          class="pa-2"
          :items="status"
          label="Status"
          item-text="text"
          item-value="value"
          solo
        ></v-select
      ></v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Date
            </th>
            <th class="text-left">
              Time
            </th>
            <th class="text-left">
              Doctor
            </th>
            <th class="text-left">
              Patient
            </th>
            <th class="text-left">
              Service
            </th>
            <th class="text-left">
              Status
            </th>
            <th class="text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in appointment" :key="item.appointmentDate">
            <td>{{ item.appointmentDate }}</td>
            <td>{{ item.appointmentTime }}</td>
            <td>{{ item.appointmentDoctor }}</td>
            <td>{{ item.appointmentPatient }}</td>
            <td>{{ item.appointmentService }}</td>
            <td>{{ item.appointmentStatus }}</td>
            <td>
              <v-btn depressed color="primary" class="caption">
                View
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AppointmentTable",
  created() {
    this.getDoctor();
    this.getPatient();
    this.getService();

    this.getAppointment();
    console.log(this.appointment);
    console.log(this.desserts);
  },
  methods: {
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
        .get("https://protected-ravine-72171.herokuapp.com/User/Doctor/")
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
    getPatient() {
      axios
        .get("https://protected-ravine-72171.herokuapp.com/User/Patient/")
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
  data: () => ({
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
