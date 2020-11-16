<template>
  <v-main>
    <div class="carousel">
      <v-carousel height="auto">
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <v-container class="hehe">
      <h1 class="diplay-4">Your Health Is Our Concern</h1>

      <p class="black--text">
        Booking apps do more than simply give patient a list of available times
        when they can come in for a meeting or a treatment. They also let your
        clientele cancel and reschedule appointments without having to contact
        you. Additionally, they make it easy for business owners and managers to
        do their jobs, allowing you to streamline communication, centralize
        payments, and manage your staff.
      </p>

      <v-btn
        class=" background-color: #EAFAF1; padding: 10px 30px; letter-spacing: 1px; font-weight: bold;"
      >
        <router-link tag="span" to="/makeAppointment"
          >Make New Appointment</router-link
        ></v-btn
      >
      <br /><br />
      <h1 class="bold">Why us ?</h1>
      <p class="text-xs-center">
        Maximizes appointment scheduling potential by providing an easy-to-use,
        unified scheduling platform for all patients and staff experience
        channels, including self-service.
      </p>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    items: [
      {
        id: "rack",
        src:
          "https://hammondtownsend.com/wp-content/uploads/2020/01/5cbf074c950c764e4f89c165_MedicalAppointment.dafc7db6805b5541eb843f4870979680500.jpg",
        title: "Rack Section",
      },
      {
        id: "subrack",
        src:
          "https://media.bizj.us/view/img/11684257/gettyimages-1234036542*1200xx2121-1198-0-33.jpg",
        title: "Subrack Section",
      },

      {
        id: "parts",
        src:
          "https://www.southtampaimmediatecare.com/wp-content/uploads/2017/02/doctor-appointment.jpg",
        title: "Parts Section",
      },
      {
        id: "admin",
        src:
          "https://mcr.health/wp-content/uploads/2019/07/If-You-Cant-Get-a-Doctors-Appointment.jpg",
        title: "Database Section",
      },
    ],
  }),
};
</script>

<style>
.hehe {
  border: 10px;
  padding: 30px;
  height: 400px;
  width: 1000px;
}

.info1 {
  margin-top: 15px;
  position: absolute;
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
  margin-top: 5px;
  position: absolute;
  position: relative;
  color: rgb(0, 0, 0);
  font-size: 2em;
  padding: 25 px;
}

p {
  text-decoration-color: darkkhaki;
}

.carousel {
  margin-top: 50px;
}
</style>
