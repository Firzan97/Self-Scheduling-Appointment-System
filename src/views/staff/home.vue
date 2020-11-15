<template>
<v-main>
    <router-view></router-view>
    <v-container ml-3>
        <v-flex>
            <h1>Your Health Is Our Concern ye ?</h1>
        </v-flex>
    </v-container>

    <v-container mr-3>
        <v-layout row wrap>
            <v-flex xs1 sm6 class="text-xs-center text-sm-right">
                <h1 style="centre"> Our service</h1>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">

            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 class="text-xs-right">
                <v-progress-circular indeterminate class="primary--text" :width="7" :size="70" v-if="loading"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-3" v-if="!loading">
            <v-flex xs10>
                <v-carousel style="cursor: pointer;">
                    <v-carousel-item v-for="meetup in meetups" :src="meetup.imageUrl" :key="meetup.id" @click="onLoadMeetup(meetup.id)">
                        <div class="title">
                            {{ meetup.title }}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12 class="text-xs-center">
                <p>Join our awesome meetups!</p>
            </v-flex>
        </v-layout>
    </v-container>
</v-main>
</template>

<script>
export default {
    name: "home",
    data: () => ({})
};
</script>

<style>
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

.container {
    background-color: #ABEBC6;
    margin-top: 25px;
    position: relative;
    width: 500px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 10px rgba(51, 245, 126, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom, #92E6B5, rgb(44, 107, 68));
}
</style>
