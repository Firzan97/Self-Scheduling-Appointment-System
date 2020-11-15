<template>
  <div>
    <div>
      <h1>Update Service</h1>
      <v-col cols="12" sm="6" md="4">
        Type
        <v-text-field
          v-model="data.type"
          @change="updateData()"
          solo
          dense
        ></v-text-field>
        Cost
        <v-text-field
          v-model="data.cost"
          @change="updateData()"
          solo
          dense
        ></v-text-field>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateService",
  props: ["service"],

  data() {
    return {
      data: {
        type: "",
        cost: 0.0,
      },
    };
  },
  created() {
    this.data = this.service;
  },
  methods: {
    updateData() {
      this.$store.commit("updateService", {
        type: this.data.type,
        cost: this.data.cost,
      });
    },
  },
};
</script>

<style scoped></style>
