import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router/index.js'
import Vuex from "vuex"
import store from './store/store.js'
import VueRouter from 'vue-router'

// const token = localStorage.getItem("token");
// if (token) {
//     Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }
// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueRouter)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')