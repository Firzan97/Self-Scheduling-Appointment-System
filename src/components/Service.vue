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
    <AddService v-if="menu == 2" />
    <!-- <v-btn
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
    </v-btn> -->
  </div>
</template>

<script>
import ServiceTable from "../components/ServiceTable";
import AddService from "../components/AddService";

export default {
  name: "Service",
  components: {
    ServiceTable,
    AddService,
  },
  data() {
    return {
      menu: 1,
    };
  },
  created() {
    this.menu = this.$store.getters.menu;
  },
  methods: {
    changeMenu(title) {
      this.$store.commit("updateMenu", title);
      this.menu = this.$store.getters.menu;
      console.log(this.menu);
    },
  },
};
</script>

<style scoped></style>
