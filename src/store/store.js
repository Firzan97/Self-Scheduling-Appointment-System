const { default: Axios } = require("axios");
import Vuex from "vuex"
import Vue from 'vue'
import router from "../router"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: true,
        count: 0,
        token: localStorage.getItem("access_token") || null
    },
    mutations: {
        increment(state) {
            state.count++
        },
        retrieveToken(state, token) {
            state.token = token
        },
        isLogged(state) {
            state.status = !status;
        }
    },
    getters: {
        status: state => state.status
    },
    actions: {
        login(context, Credential) {
            Axios.post("http://localhost:3000/login", {
                    email: Credential.email,
                    password: Credential.password
                })
                .then(response => {
                    const token = response.data.token
                    localStorage.setItem('access_token', token)
                    context.commit('retrieveToken', token)
                    context.commit('isLogged')
                    router.push('/profile')
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

})