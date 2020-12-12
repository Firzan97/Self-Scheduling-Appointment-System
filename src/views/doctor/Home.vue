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
      <v-btn target="_blank" text>
        <router-link tag="span" to="/Login">
          <span class="mr-2">Home</span>
        </router-link>
      </v-btn>
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
      <DoctorAppointment v-if="currentMenu == 1" />
      <DoctorAppointmentHistory v-if="currentMenu == 2" />
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import DoctorAppointment from "../../components/DoctorAppointment.vue";
import DoctorAppointmentHistory from "../../components/DoctorAppointmentHistory.vue";

export default {
  components: {
    DoctorAppointment,
    DoctorAppointmentHistory,
  },
  data: () => ({
    currentMenu: 1,
    selectedItem: 1,
    items: [
      { text: "Appointments", icon: "mdi-clock" },
      { text: "History", icon: "mdi-account" },
    ],
    search: "",
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        filterable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%",
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%",
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%",
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    changeMenu(menuTitle) {
      if (menuTitle == "Appointments") {
        this.currentMenu = 1;
      }
      if (menuTitle == "History") {
        this.currentMenu = 2;
      }
    },
  },
};
</script>

<style scoped></style>
