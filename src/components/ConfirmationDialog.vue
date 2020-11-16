<template>
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
        {{ name }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        {{ confirmation.headline }}
      </v-card-title>
      <v-card-text> {{ confirmation.message }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="
            {
              {
                task();
              }
            }
          "
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  data() {
    return {
      dialog: false,
    };
  },
  props: ["confirmation", "task", "id", "name"],
};
</script>

<style scoped></style>
