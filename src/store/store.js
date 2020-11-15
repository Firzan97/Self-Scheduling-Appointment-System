const { default: Axios } = require("axios");
import Vuex from "vuex"
import Vue from 'vue'
import router from "../router"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        token: null,
        isLogged: false,
        menu: 1,
        doctorMenu: 1,
        patientMenu: 1,
        appointmentMenu: 1,
        user: null,
        serviceType: "",
        serviceCost: 0.0,
        doctor: { "speciality": "", "username": "", "email": "", "fullname": "", "phonenumber": "", "age": "", "password": "" },
        patient: { "username": "", "email": "", "fullname": "", "phonenumber": "", "age": "", "password": "" }

    },
    mutations: {
        increment(state) {
            state.count++
        },
        retrieveToken(state, tokens) {
            state.token = tokens
        },
        loggedStatus(state, status) {
            state.isLogged = status
        },
        updateMenu(state, newMenu) {
            state.menu = newMenu
        },
        updateDoctorMenu(state, newMenu) {
            state.doctorMenu = newMenu
        },
        updatePatientMenu(state, newMenu) {
            state.patientMenu = newMenu
        },
        updateAppointmentMenu(state, newMenu) {
            state.appointmentMenu = newMenu
        },
        updateUser(state, user) {
            state.user = user
        },
        updateService(state, payload) {
            state.serviceCost = payload.cost,
                state.serviceType = payload.type
        },
        updateDoctor(state, payload) {
            state.doctor.speciality = payload.speciality,
                state.doctor.username = payload.username,
                state.doctor.email = payload.email,
                state.doctor.fullname = payload.fullname,
                state.doctor.phonenumber = payload.phonenumber,
                state.doctor.age = payload.age,
                state.doctor.password = payload.password

        },
        updatePatient(state, payload) {
            state.patient.username = payload.username,
                state.patient.email = payload.email,
                state.patient.fullname = payload.fullname,
                state.patient.phonenumber = payload.phonenumber,
                state.patient.age = payload.age,
                state.patient.password = payload.password

        }
    },
    getters: {
        isLogged: state => {
            return state.isLogged;
        },
        menu: state => {
            return state.menu;
        },
        patientMenu: state => {
            return state.patientMenu;
        },
        appointmentMenu: state => {
            return state.appointmentMenu;
        },
        doctorMenu: state => {
            return state.doctorMenu;
        },
        checkToken: state => {
            return state.token;
        },
        retrieveUser: state => {
            return state.user;
        },
        serviceCost: state => {
            return state.serviceCost;
        },
        serviceType: state => {
            return state.serviceType;
        },
        doctorData: state => {
            return state.doctor;
        },
        patientData: state => {
            return state.patient;
        }

    },
    actions: {
        login(context, Credential) {
            Axios.post("http://localhost:3000/login", {
                    email: Credential.email,
                    password: Credential.password
                })
                .then(response => {
                    const token = response.data.token
                    const user = response.data.user
                    const role = response.data.user.role
                    localStorage.setItem("userid", user.id)
                    localStorage.setItem("role", role)
                    context.commit('loggedStatus', true)

                    localStorage.setItem('access_token', token)
                    context.commit('retrieveToken', token)
                    if (role == "Admin") {
                        router.push('/admin')

                    } else if (role == "Doctor") {
                        context.commit('updateUser', user)

                        router.push('/staff')

                    } else {
                        router.push('/profile')

                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        logout(context) {

            context.commit('retrieveToken', null)

            context.commit('loggedStatus', false)
            router.push('/login')

        },
        register(context, Credential) {
            Axios
                .post("http://localhost:3000/register", {
                    username: Credential.username,
                    email: Credential.email,
                    phonenumber: Credential.phonenumber,
                    fullname: Credential.fullname,
                    age: Credential.age,
                    password: Credential.password,
                })
                .then(response => {
                    const token = response.data.token
                    const user = response.data.user
                    console.log(response)
                    localStorage.setItem("userid", user.id)
                    localStorage.setItem('access_token', token)
                    context.commit('retrieveToken', token)
                    context.commit('loggedStatus', true)

                    router.push('/profile')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

})