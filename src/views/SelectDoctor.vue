<template>
  <div class="makeAppointment">
    <v-card
      class="d-flex justify-space-around mt-10"
      :color="'white'"
      flat
      tile
    >
      <v-col cols="16" sm="6" md="3">
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Appointment Date"
              ppend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
        <v-select
          :items="this.services"
          v-model="selectedService"
          label="Services"
          item-text="type"
          item-value="id"
          return-object
          dense
          solo
          @change="getDoctors()"
        ></v-select>
        <v-select
          :items="this.doctors"
          v-model="doctor"
          :hint="`${doctor.value}, ${doctor.name}`"
          label="Select Doctor"
          item-text="name"
          item-value="value"
          return-object
          dense
          solo
        ></v-select>

        <v-btn @click="this.getDoctors">
          clear
        </v-btn>
      </v-col>

      <v-col cols="5">
        <v-card
          class="d-flex justify-start mb-6"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
          flat
          tile
        >
          <v-card v-for="n in 1" :key="n" class="pa-2" outlined tile>
            DOCTOR NAME :
          </v-card>
          {{ doctor.name }}
        </v-card>
        <v-card
          class="d-flex justify-start mb-6"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
          flat
          tile
        >
          <v-card v-for="n in 1" :key="n" class="pa-2" outlined tile>
            Speciality :
          </v-card>
          {{ doctor.speciality }}
        </v-card>
        <v-select
          :items="this.time"
          v-model="selectedTime"
          :hint="`${doctor.value}, ${doctor.name}`"
          label="Select Time"
          item-text="id"
          item-value="value"
          return-object
          dense
          solo
        ></v-select>
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
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
              Confirm Appointment
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              Confirm your Appointment
            </v-card-title>

            <v-card-text>
              You want to booking an appointment with {{ doctor.name }} on
              {{ date }} at {{ selectedTime.service }}. Confirm to booking?
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="submitAppointment()">
                Confirm
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      doctor: { id: 0, name: "", speciality: "" },
      selectedService: [],
      services: [],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dialog: false,
      doctors: [],
      userid: "",
      time: [
        { id: "9:00 AM", service: "9:00 AM" },
        { id: "10:00 AM", service: "10:00 AM" },
        { id: "11:00 AM", service: "11:00 AM" },
        { id: "12:00 PM", service: "12:00 PM" },
        { id: "2:00 PM", service: "2:00 PM" },
        { id: "3:00 PM", service: "3:00 PM" },
        { id: "4:00 PM", service: "4:00 PM" },
        { id: "5:00 PM", service: "5:00 PM" },
      ],
      selectedTime: "",
    };
  },

  created() {
    this.getService(),
      this.getDoctors(
        "http://localhost:3000/Doctor/" + this.selectedService.service
      );
    if (this.$store.getters.checkToken === null) {
      this.$router.push("/login");
    } else {
      if (localStorage.getItem("role") == "Admin") {
        this.$router.push("/admin");
      } else if (localStorage.getItem("role") == "Admin") {
        this.$router.push("/admin");
      }
    }
  },
  methods: {
    getService() {
      axios
        .get("http://localhost:3000/Service")
        .then((response) => {
          console.log(response);
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
    getDoctors() {
      console.log("http://localhost:3000/Doctor/" + this.selectedService.type);
      this.doctors = [];
      axios
        .get("http://localhost:3000/Doctor/" + this.selectedService.type)
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].username);
            let d = {
              id: response.data[i].User.id,
              name: "Dr." + response.data[i].User.username,
              speciality: response.data[i].speciality,
            };
            this.doctors.push(d);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitAppointment() {
      this.dialog = false;
      this.userid = localStorage.getItem("userid");
      console.log("ni idddddddddd" + this.userid);
      axios
        .post("http://localhost:3000/Appointment", {
          regTime: this.selectedTime.id,
          regDate: this.date,
          status: "Pending",
          patientId: this.userid,
          ServiceId: this.selectedService.id,
          doctorId: this.doctor.id,
        })
        .then((response) => {
          console.log("Doctor Id" + this.doctor.id);
          console.log("Patient ID" + this.userid);
          console.log("Service Id" + this.selectedService.id);

          console.log(response);
          // this.$router.push("/Appointment/Status");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.makeAppointment {
  margin-top: 80px;
}
</style>
