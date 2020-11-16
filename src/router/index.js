import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register2.vue"
import Login from "../views/Login2.vue"
import Home from "../views/Home.vue"
import makeAppointment from "../views/SelectDoctor.vue"
import selectDoctor from "../views/SelectDoctor.vue"
import AppointmentHistory from "../views/AppointmentHistory.vue"
import AppointmentStatus from "../views/AppointmentStatus.vue"
import admin from "../views/admin/Home.vue"
import Staff from "../views/doctor/Home.vue"
import Profile from "../views/UserProfile.vue"


Vue.use(VueRouter);



const routes = [{
        path: '/',
        name: "Home",
        component: Home,
        meta: {
            title: 'Home',

        }
    },
    {
        path: '/Register',
        name: "Register",
        component: Register,
        meta: {
            title: 'Register',

        }
    },
    {
        path: '/Login',
        name: "Login",
        component: Login,
        meta: {
            title: 'Login',

        }
    },
    {
        path: '/makeAppointment',
        name: "MakeAppointment",
        component: makeAppointment,
        meta: {
            title: 'Make Appointment',

        }
    },
    {
        path: '/selectDoctor',
        name: "SelectDoctor",
        component: selectDoctor,
        meta: {
            title: 'Select Doctor',

        }
    },
    {
        path: '/profile',
        name: "Profile",
        component: Profile,
        meta: {
            title: 'Profile',

        }
    },
    {
        path: '/Appointment/History',
        name: "AppointmentHistory",
        component: AppointmentHistory,
        meta: {
            title: 'Appointment History',

        }
    },
    {
        path: '/Appointment/Status',
        name: "AppointmentStatus",
        component: AppointmentStatus,
        meta: {
            title: 'Appointment Status',

        }
    },
    {
        path: '/admin',
        component: admin,
        meta: {
            title: 'Admin Dashboard',

        }
    },

    {
        path: '/staff',
        component: Staff,
        meta: {
            title: "Staff Homepage",

        }
    }
]
const router = new VueRouter({
    // short for `routes: routes`,
    mode: 'history',
    base: "/",
    routes,
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})
router.replace("/")

export default router;