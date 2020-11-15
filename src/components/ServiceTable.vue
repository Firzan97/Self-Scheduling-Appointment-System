<template>
  <div>
    <div v-if="menu == 1">
      <v-container fluid>
        <!-- If using vue-router -->
        <h1>Service</h1>

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
                  Cost
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in service" :key="item.id">
                <td>{{ item.type }}</td>
                <td>{{ item.cost }}</td>
                <td>
                  <v-btn depressed color="primary" class="caption mr-4">
                    View
                  </v-btn>

                  <v-btn
                    @click="changeMenu(3, item.id, item)"
                    depressed
                    color="warning"
                    class="caption mr-4"
                  >
                    Update
                  </v-btn>

                  <v-btn
                    @click="deleteService(item.id)"
                    depressed
                    color="error"
                    class="caption"
                  >
                    Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </div>
    <div v-if="menu == 3">
      <UpdateService :service="serviceData" />
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
        @click="updateService()"
      >
        Confirm
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UpdateService from "../components/UpdateService";
export default {
  name: "ServiceTable",
  components: {
    UpdateService,
  },
  created() {
    this.menu == this.$store.getters.menu;
    console.log(this.menu);
    this.getService();
  },
  methods: {
    changeMenu(title, id, item) {
      this.$store.commit("updateMenu", title);
      this.menu = this.$store.getters.menu;
      console.log(this.menu);
      this.serviceId = id;
      this.serviceData = item;
    },
    getService() {
      axios
        .get("http://localhost:3000/Service")
        .then((response) => {
          console.log(response);
          let data = {};
          this.service = [];
          if (response.data.length > 0) {
            for (var x = 0; x < response.data.length; x++) {
              data = {
                id: response.data[x].id,
                type: response.data[x].type,
                cost: response.data[x].cost,
              };
              this.service.push(data);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteService(id) {
      axios
        .delete("http://localhost:3000/Service/" + id)
        .then((response) => {
          console.log(response);
          this.getService();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateService() {
      console.log(this.$store.getters.serviceType);
      console.log(this.$store.getters.serviceCost);
      axios
        .patch("http://localhost:3000/Service/" + this.serviceId, {
          type: this.$store.getters.serviceType,
          cost: this.$store.getters.serviceCost,
        })
        .then((response) => {
          console.log(response);
          this.getService();
          this.changeMenu(1, this.serviceId, this.serviceData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data: () => ({
    serviceData: {},
    serviceId: 0,
    menu: 1,
    service: [],
    serviceType: "",
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
