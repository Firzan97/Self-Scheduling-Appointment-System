<template>
  <div>
    <ServiceTable v-if="menu == 1" />
    <v-col v-if="menu == 1" class="text-right">
      <v-btn
        depressed
        color="primary"
        class=" caption mr-4"
        @click="changeMenu(2)"
      >
        Add service
      </v-btn>
    </v-col>
    <div v-if="menu == 2">
      <h1>Add Service</h1>
      <v-col cols="12" sm="6" md="4">
        Type
        <v-text-field v-model="type" solo dense></v-text-field>
        Cost
        <v-text-field v-model="cost" solo dense></v-text-field>
      </v-col>
      <v-btn
        v-if="menu == 2"
        depressed
        color="primary"
        class=" caption mr-4"
        @click="changeMenu(1)"
      >
        Back
      </v-btn>
      <v-btn
        v-if="menu == 2"
        depressed
        color="primary"
        class=" caption mr-4"
        @click="addService()"
      >
        Confirm
      </v-btn>
    </div>
  </div>
</template>

<script>
import ServiceTable from "../components/ServiceTable";
import axios from "axios";

export default {
  name: "AddService",
  components: {
    ServiceTable,
  },
  data() {
    return {
      menu: 2,
      type: "",
      cost: 0.0,
    };
  },
  created() {},
  computed: {
    updateData() {
      this.$store.commit("updateMenu", this.type, this.cost);
      console.log(this.$store.getters.type);
      console.log(this.$store.getters.cost);

      return this.cost;
    },
  },
  methods: {
    changeMenu(title) {
      this.$store.commit("updateMenu", title);
      this.menu = this.$store.getters.menu;
      console.log(this.menu);
    },
    addService() {
      axios
        .post("http://localhost:3000/Service", {
          type: this.type,
          cost: this.cost,
        })
        .then((response) => {
          console.log(response);
          this.menu = 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
