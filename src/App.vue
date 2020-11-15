<template>
<div>
    <v-app>
        <v-app-bar app color="green" dark>

            <div class="d-flex align-center">
                <v-img alt="Vuetify Logo" class="shrink mr-3" contain src="./assets/appointment-image.jpg" transition="scale-transition" width="40" />
                <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="assets/appointment-image.jpg" width="100" />
                <v-btn target="_blank" text>
                    <router-link tag="span" to="/">
                        <span class="mr-2">Home</span>
                    </router-link>
                </v-btn>
                <v-btn target="blank" text>
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

            <v-btn target="blank" text>
                <router-link tag="span" to="/Login">

                    <span class="mp-1">Login</span>
                </router-link>
            </v-btn>

            <v-avatar>
                <v-select img src="https://cdn.vuetifyjs.com/images/john.jpg" :items="items" filled label="" background-colour:green>
                    <router-link tag="span" to="/userProfile">
                        <option></option>
                    </router-link>
                </v-select>

            </v-avatar>

        </v-app-bar>

        <!--   Content dalam home **

      > -->

        <v-main md-1>
            <router-view></router-view>
            <Home />
            <br>
            <br>

            <v-footer absolute>
                <v-col class="text-center" cols="12">
                    {{ new Date().getFullYear() }} — <strong>Self Scheduling Appointment</strong>
                </v-col>
            </v-footer>
        </v-main>

    </v-app>
</div>
</template>

<script>
export default {
    name: 'App',

    data: () => ({
        items: ['Profile', 'Appointment Status', 'History']

        //

    })
};
</script>

<style>
li {

    text-decoration: none;
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
    position: absolute;
    position: relative;
    color: rgb(0, 0, 0);
    font-size: 2em;
    padding: 25 px;

}

main {
    background-color: #ffffff;
}

p {
    text-emphasis: none;
    margin: 20px 0 30px;
    text-size-adjust: 10px;
}
</style>
