<template>
  <div>
    <div v-if="menu == 1">
      <v-container fluid>
        <!-- If using vue-router -->
        <h1>Appointment</h1>

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
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
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
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
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
                <td>{{ item.appointmentDoctor }}</td>

                <td>{{ item.appointmentType }}</td>
                <td>{{ item.appointmentStatus }}</td>
                <!-- <td>
                  <v-btn
                    @click="viewAppointment()"
                    depressed
                    color="primary"
                    class="caption"
                  >
                    View
                  </v-btn>
                </td>
                <td>
                  <v-btn
                    @click="changeMenu(3)"
                    depressed
                    color="warning"
                    class="caption"
                  >
                    Update
                  </v-btn>
                </td>
                <td>
                  <v-btn
                    @click="deleteAppointment(item.appointmentId)"
                    depressed
                    color="error"
                    class="caption"
                  >
                    Delete
                  </v-btn>
                </td> -->
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </div>
    <div v-if="menu == 3">
      <UpdateAppointment />
      <v-btn
        depressed
        color="primary"
        class=" caption mr-4"
        @click="changeMenu(1)"
      >
        Back
      </v-btn>
      <v-btn
        depressed
        color="primary"
        class=" caption mr-4"
        @click="updateAppointment()"
      >
        Confirm
      </v-btn>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import UpdateAppointment from "../components/UpdateAppointment";
export default {
  name: "AppointmentTable",
  components: {
    UpdateAppointment,
  },
  data() {
    return {
      patient: [],
      userid: "",
      appointment: [],
      doctor: [],
      doctorName: "",
      services: [],
      serviceType: "",
      menu: 1,
    };
  },
  created() {
    this.getDoctor();
    this.getPatient();
    this.getService();

    this.getAppointment();
  },
  methods: {
    changeMenu(title) {
      this.$store.commit("updateAppointmentMenu", title);
      this.menu = this.$store.getters.appointmentMenu;
      console.log(this.menu);
    },
    deleteAppointment(id) {
      axios
        .delete("http://localhost:3000/Appointment/" + id)
        .then((response) => {
          console.log(response);
          this.getAppointment();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAppointment() {
      this.appointment = [];
      axios
        .get("http://localhost:3000/Appointment")
        .then((response) => {
          let data = {};
          for (var x = 0; x < response.data.length; x++) {
            for (var i = 0; i < this.doctor.length; i++) {
              if (response.data[x].doctorId == this.doctor[i].id) {
                this.doctorName = this.doctor[i].fullname;
              }
            }
            for (i = 0; i < this.services.length; i++) {
              if (response.data[x].ServiceId == this.services[i].id) {
                this.serviceType = this.services[i].type;
              }
            }

            data = {
              appointmentId: response.data[x].id,
              appointmentTime: response.data[x].regTime,
              appointmentDate: response.data[x].regDate.slice(0, 10),
              appointmentStatus: response.data[x].status,
              appointmentType: this.serviceType,
              appointmentDoctor: "Dr. " + this.doctorName,
            };
            this.appointment.push(data);
            console.log(this.appointment);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDoctor() {
      axios
        .get("http://localhost:3000/User/Doctor/")
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
        .get("http://localhost:3000/Service")
        .then((response) => {
          let data = {};
          if (response.data.length > 0) {
            for (var x = 0; x < response.data.length; x++) {
              data = {
                id: response.data[x].id,
                type: response.data[x].type,
              };
              this.services.push(data);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPatient() {
      axios
        .get("http://localhost:3000/Patient/")
        .then((response) => {
          let data = {};
          this.patient = [];
          if (response.data.length != 0) {
            for (var x = 0; x < response.data.length; x++) {
              data = {
                id: response.data[x].id,
                username: response.data[x].User.username,
                fullname: response.data[x].User.fullname,
                age: response.data[x].User.age,
                email: response.data[x].User.email,
                phonenumber: response.data[x].User.phonenumber,
              };
              this.patient.push(data);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
