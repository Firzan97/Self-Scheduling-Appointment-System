<template>
  <div>
    <v-app>
      <v-app-bar app color="green" dark>
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
            <router-link tag="span" to="/makeAppointment">
              <span class="mr-2">Make an Appointment</span>
            </router-link>
          </v-btn>
        </div>

        <v-spacer></v-spacer>

        <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->

        <v-btn target="_blank" text>
          <router-link tag="span" to="/admin">
            <!-- <v-icon>mdi-open-in-new</v-icon> -->
            <span class="mr-2">Login</span>
          </router-link>
        </v-btn>
        <v-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
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
    //
  }),
};
</script>

<style>
li {
  text-decoration: none;
}
</style>
