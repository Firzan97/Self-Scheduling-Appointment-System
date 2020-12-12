<template>
  <div>
    <v-app>
      <v-app-bar app color="blue" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="./assets/appointment-image.jpg"
            transition="scale-transition"
            width="40"
          />
          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="assets/appointment-image.jpg"
            width="100"
          />
          <v-btn target="_blank" text>
            <router-link tag="span" to="/">
              <span class="mr-2">Home</span>
            </router-link>
          </v-btn>
          <v-btn target="blank" text>
            <router-link tag="span" to="/makeAppointment">
              <span class="mr-2">Appointment</span>
            </router-link>
          </v-btn>
        </div>

        <v-spacer></v-spacer>
        <v-btn @click="logout" target="_blank" text v-if="this.isLogged">
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
          <span class="mr-2">Logout</span>
        </v-btn>
        <v-btn target="_blank" text v-else>
          <router-link tag="span" to="Login">
            <!-- <v-icon>mdi-open-in-new</v-icon> -->
            <span>Login</span>
          </router-link>
        </v-btn>

        <b-dropdown
          size="lg"
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
          v-if="this.isLogged"
        >
          <template #button-content>
            <b-avatar
              src="https://cdn.vuetifyjs.com/images/john.jpg"
            ></b-avatar>
          </template>

          <b-dropdown-item :to="{ name: 'Profile' }"> Profile</b-dropdown-item>

          <b-dropdown-item :to="{ name: 'AppointmentStatus' }"
            >Status</b-dropdown-item
          >
          <b-dropdown-item :to="{ name: 'AppointmentHistory' }"
            >History</b-dropdown-item
          >
        </b-dropdown>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    items: ["Profile", "Appointment Status", "History"],
  }),
  created() {
    if (localStorage.getItem("role") == "Doctor") {
      this.$router.push("/staff");
    } else if (localStorage.getItem("role") == "Admin") {
      this.$router.push("/admin");
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  // methods: {
  //   logout: function() {
  //     this.$store.dispatch("logout").then(() => {
  //       this.$router.push("/login");
  //     });
  //   },
  // },
};
</script>

<style>
li {
  text-decoration: none;
}

title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}

h1 {
  position: absolute;
  position: relative;
  color: rgb(0, 0, 0);
  font-size: 2em;
  padding: 25 px;
}

main {
  background-color: #ffffff;
}

p {
  text-emphasis: none;
  margin: 20px 0 30px;
  text-size-adjust: 10px;
}
</style>
