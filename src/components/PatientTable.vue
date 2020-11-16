<template>
  <div>
    <div v-if="menu == 1">
      <v-container fluid>
        <!-- If using vue-router -->
        <h1>Patient</h1>

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
                  Username
                </th>
                <th class="text-left">
                  Fullname
                </th>
                <th class="text-left">
                  Email
                </th>
                <th class="text-left">
                  Age
                </th>
                <th class="text-left">
                  Phone Number
                </th>

                <th class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in patient" :key="item.userId">
                <td>{{ item.username }}</td>
                <td>{{ item.fullname }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.age }}</td>
                <td>{{ item.phonenumber }}</td>
                <td>
                  <v-btn depressed color="primary" class="caption mr-4">
                    View
                  </v-btn>

                  <v-btn
                    @click="changeMenu(3, item.patientId, item)"
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
                        Aye you sure to delete this patient?
                      </v-card-title>
                      <v-card-text>
                        Please be remind that you will delete this patient!
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
                          @click="deletePatient(item.userId)"
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
      <UpdatePatient :patient="patientData" />
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
            Aye you sure to update this patient?
          </v-card-title>
          <v-card-text>
            Please be remind that you will overwrite existing data!
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="updatePatient()">
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
import UpdatePatient from "../components/UpdatePatient";
export default {
  name: "PatientTable",
  components: {
    UpdatePatient,
  },
  data() {
    return {
      dialog: false,
      patient: [],
      menu: 1,
      patientData: {},
      patientId: 0,
    };
  },
  created() {
    this.getPatient();
  },
  methods: {
    changeMenu(title, id, patient) {
      this.$store.commit("updatePatientMenu", title);
      this.menu = this.$store.getters.patientMenu;
      console.log(this.menu);
      this.patientId = id;
      this.patientData = patient;
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
                userId: response.data[x].User.id,
                patientId: response.data[x].id,
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
    deletePatient(id) {
      axios
        .delete("http://localhost:3000/User/" + id)
        .then((response) => {
          this.dialog = false;
          console.log(response);
          this.getPatient();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updatePatient() {
      console.log("http://localhost:3000/Patient/" + this.patientId);
      axios
        .patch("http://localhost:3000/Patient/" + this.patientId, {
          username: this.$store.getters.patientData.username,
          email: this.$store.getters.patientData.email,
          fullname: this.$store.getters.patientData.fullname,
          phonenumber: this.$store.getters.patientData.phonenumber,
          age: this.$store.getters.patientData.age,
          password: this.$store.getters.patientData.password,
        })
        .then((response) => {
          this.dialog = false;

          console.log(response);
          this.getPatient();
          this.changeMenu(1, this.doctorId, this.patientData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
