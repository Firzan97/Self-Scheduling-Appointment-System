<template>
  <div>
    <v-card
      class="d-flex justify-space-around mt-10"
      :color="'white'"
      flat
      tile
    >
      <v-col cols="16" sm="6" md="3">
        <v-select :items="this.services" label="Services" dense solo></v-select>
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
        <v-select :items="this.services" label="Services" dense solo></v-select>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="Telephones"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>

        <v-btn @click="clear">
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
        </v-card>
        <v-card
          class="d-flex justify-start mb-6"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
          flat
          tile
        >
          <v-card v-for="n in 1" :key="n" class="pa-2" outlined tile>
            DOCTOR NAME :
          </v-card>
        </v-card>
        <v-card
          class="d-flex justify-start mb-6"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
          flat
          tile
        >
          <v-card v-for="n in 1" :key="n" class="pa-2" outlined tile>
            (Availability):
          </v-card>
        </v-card>
        <v-card
          class="d-flex justify-space-around mb-6"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
          flat
          tile
        >
          <v-card v-for="n in 5" :key="n" outlined tile>
            justify
          </v-card>
        </v-card>
        <v-card
          class="d-flex justify-space-around mb-6"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
          flat
          tile
        >
          <v-card v-for="n in 4" :key="n" outlined tile>
            justify
          </v-card>
        </v-card>
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
              Privacy Policy
            </v-card-title>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
    };
  },
};
</script>

<style scoped></style>
