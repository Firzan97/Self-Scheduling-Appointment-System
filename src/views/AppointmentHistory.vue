<template>
  <div class="appointmentHistory">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Time
            </th>
            <th class="text-left">
              Date
            </th>
            <th class="text-left">
              Status
            </th>
            <th class="text-left">
              Service
            </th>
            <th class="text-left">
              Doctor
            </th>
            <th class="text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in appointment" :key="item.appointmentTime">
            <td>{{ item.appointmentTime }}</td>
            <td>{{ item.appointmentDate }}</td>
            <td>{{ item.appointmentStatus }}</td>
            <td>{{ item.appointmentPatient }}</td>
            <td>{{ item.appointmentDoctor }}</td>
            <td>
              <v-btn depressed color="primary" class="caption">
                View Appointment
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppointmentStatus",
  data() {
    return {
      userid: "",
      appointment: [],
      doctor: [],
      doctorName: "",
      services: [],
      serviceType: "",
    };
  },
  created() {
    this.getService();
    this.getDoctor();
    this.getAppointment();
  },
  methods: {
    getAppointment() {
      this.userid = localStorage.getItem("userid");
      axios
        .get(
          "http://localhost:3000/User/Patient/" + this.userid + "/Appointment"
        )
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
            if (
              response.data[x].regDate.slice(0, 10) <
              new Date().toJSON().slice(0, 10)
            ) {
              data = {
                appointmentTime: response.data[x].regTime,
                appointmentDate: response.data[x].regDate.slice(0, 10),
                appointmentStatus: response.data[x].status,
                appointmentPatient: this.serviceType,
                appointmentDoctor: "Dr. " + this.doctorName,
              };
              this.appointment.push(data);
            }
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
  },
};
</script>

<style scoped>
.appointmentHistory {
  margin-top: 30px;
  padding: 20px;
}
</style>
