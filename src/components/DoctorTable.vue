<template>
  <div>
    <div v-if="menu == 1">
      <v-container fluid>
        <!-- If using vue-router -->
        <h1>Doctor</h1>
        <!-- <v-row>
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
        </v-row> -->
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Username
                </th>
                <th class="text-left">
                  Fullname
                </th>
                <th class="text-left">
                  Email
                </th>
                <th class="text-left">
                  Speciality
                </th>

                <th class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in doctor" :key="item.doctorid">
                <td>{{ item.username }}</td>
                <td>{{ "Dr." + item.fullname }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.speciality }}</td>

                <td>
                  <v-btn depressed color="primary" class="caption mr-4">
                    View
                  </v-btn>
                  <v-btn
                    @click="changeMenu(3, item.doctorid, item)"
                    depressed
                    color="warning"
                    class="caption mr-4"
                  >
                    Update
                  </v-btn>
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        v-bind="attrs"
                        v-on="on"
                        depressed
                        color="error"
                        class="caption  mr-4"
                      >
                        Delete
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">
                        Aye you sure to delete this doctor?
                      </v-card-title>
                      <v-card-text>
                        Please be remind that you cannot recover the data after
                        delete it!
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green darken-1"
                          text
                          @click="dialog = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="green darken-1"
                          text
                          @click="deleteDoctor(item.userid)"
                        >
                          Confirm
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </div>
    <div v-if="menu == 3">
      <UpdateDoctor :doctor="doctorData" />
      <v-btn
        depressed
        color="primary"
        class=" caption mr-4"
        @click="changeMenu(1)"
      >
        Back
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            depressed
            color="error"
            class="caption  mr-4"
          >
            Update
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Aye you sure to update this doctor?
          </v-card-title>
          <v-card-text>
            Please be remind that you will overwrite existing data!
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="updateDoctor()">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UpdateDoctor from "../components/UpdateDoctor";

export default {
  name: "DoctorTable",

  components: {
    UpdateDoctor,
  },
  created() {
    this.getDoctor();
  },
  methods: {
    changeMenu(title, id, doctor) {
      this.$store.commit("updateDoctorMenu", title);
      this.menu = this.$store.getters.doctorMenu;
      console.log(this.menu);
      this.doctorId = id;
      this.doctorData = doctor;
    },
    getDoctor() {
      axios
        .get("https://protected-ravine-72171.herokuapp.com/Doctor/")
        .then((response) => {
          let data = {};
          this.doctor = [];
          if (response.data.length != 0) {
            for (var x = 0; x < response.data.length; x++) {
              data = {
                doctorid: response.data[x].id,
                userid: response.data[x].User.id,
                username: response.data[x].User.username,
                fullname: response.data[x].User.fullname,
                email: response.data[x].User.email,
                speciality: response.data[x].speciality,
                phonenumber: response.data[x].User.phonenumber,
                age: response.data[x].User.age,
              };
              this.doctor.push(data);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteDoctor(id) {
      axios
        .delete("https://protected-ravine-72171.herokuapp.com/User/" + id)
        .then((response) => {
          console.log(response);
          this.getDoctor();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateDoctor() {
      console.log(
        "https://protected-ravine-72171.herokuapp.com/Doctor/" + this.doctorId
      );

      axios
        .patch(
          "https://protected-ravine-72171.herokuapp.com/Doctor/" +
            this.doctorId,
          {
            speciality: this.$store.getters.doctorData.speciality,
            username: this.$store.getters.doctorData.username,
            email: this.$store.getters.doctorData.email,
            fullname: this.$store.getters.doctorData.fullname,
            phonenumber: this.$store.getters.doctorData.phonenumber,
            age: this.$store.getters.doctorData.age,
            password: this.$store.getters.doctorData.password,
          }
        )
        .then((response) => {
          this.dialog = false;
          console.log(response);
          this.getDoctor();
          this.changeMenu(1, this.doctorId);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data: () => ({
    dialog: false,
    menu: 1,
    doctorId: 0,
    doctor: [],
    serviceType: "",
    search: "",
    doctorData: {},
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
