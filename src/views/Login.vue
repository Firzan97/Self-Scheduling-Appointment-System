<template>
  <v-card class="d-flex justify-center pa-7 ma-12">
    <v-form ref="form" v-model="valid" lazy-validation>
      <h1>Login</h1>

      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Reset Form
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped></style>
