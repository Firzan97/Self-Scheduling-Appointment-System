<template>
  <div>
    <v-card class="profile mx-auto" max-width="434" tile>
      <v-img
        height="100%"
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
      >
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0" cols="12">
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-img
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="title">
                  Marcus Obrien
                </v-list-item-title>
                <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
    <v-card class="d-flex justify-center mb-6" :color="'white'" flat tile>
      <v-col cols="16" sm="6" md="3">
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="IC Number"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="Telephones"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-select :items="this.services" label="Services" dense solo></v-select>
        <v-card class="d-flex justify-end" :color="'white'" flat tile>
          <v-btn @click="clear">
            Confirm
          </v-btn>
        </v-card>
      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  created() {
    if (localStorage.getItem("access_token") === null) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.profile {
  margin-top: 7%;
}
</style>
