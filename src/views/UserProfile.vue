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
          v-model="username"
          :error-messages="usernameErrors"
          label="Username"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="fullname"
          :error-messages="fullnameErrors"
          label="Full Name"
          required
          @input="$v.fullname.$touch()"
          @blur="$v.fullname.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="phonenumber"
          :error-messages="phonenumberErrors"
          label="Phone Number"
          required
          @input="$v.phonenumber.$touch()"
          @blur="$v.phonenumber.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="age"
          :error-messages="ageErrors"
          type="number"
          label="Age"
          required
          @input="$v.age.$touch()"
          @blur="$v.age.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-card class="d-flex justify-end" :color="'white'" flat tile>
          <v-btn>
            Confirm
          </v-btn>
        </v-card>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "UserProfile",
  data() {
    return {
      username: "",
      fullname: "",
      phonenumber: "",
      age: "",
      ic: "",
      userid: "",
      user: {},
      email: "",
      nameErrors: "",
      emailErrors: "",
    };
  },
  created() {
    console.log(this.$store.getters.checkToken);
    this.currentUser();
    if (this.$store.getters.checkToken === null) {
      this.$router.push("/login");
    }
  },
  methods: {
    currentUser() {
      this.userid = localStorage.getItem("userid");
      Axios.get("http://localhost:3000/user/patient/" + this.userid)
        .then((response) => {
          this.user = response.data;
          this.username = this.user.username;
          this.fullname = this.user.fullname;
          this.email = this.user.email;
          this.age = this.user.age;
          this.phonenumber = this.user.phonenumber;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.profile {
  margin-top: 7%;
}
</style>
