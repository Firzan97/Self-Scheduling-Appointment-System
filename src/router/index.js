import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Home from "../views/home.vue"
import makeAppointment from "../views/MakeAppointment.vue"
import selectDoctor from "../views/SelectDoctor.vue"
import appointmentHistory from "../views/AppointmentHistory.vue"
import appointmentStatus from "../views/AppointmentStatus.vue"
import profile from "../views/Profile.vue"
import admin from "../views/admin/home.vue"
import staff from "../views/staff/home.vue"
import userProfile from "../views/UserProfile.vue"


Vue.use(VueRouter);



const routes = [{
        path: '/',
        component: Home,
        meta: {
            title: 'Home',

        }
    },
    {
        path: '/Register',
        component: Register,
        meta: {
            title: 'Register',

        }
    },
    {
        path: '/Login',
        component: Login,
        meta: {
            title: 'Login',

        }
    },
    {
        path: '/makeAppointment',
        component: makeAppointment,
        meta: {
            title: 'Make Appointment',

        }
    },
    {
        path: '/selectDoctor',
        component: selectDoctor,
        meta: {
            title: 'Select Doctor',

        }
    },
    {
        path: '/profile',
        component: profile,
        meta: {
            title: 'Profile',

        }
    },
    {
        path: '/appointment/history',
        component: appointmentHistory,
        meta: {
            title: 'Appointment History',

        }
    },
    {
        path: '/appointment/status',
        component: appointmentStatus,
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
        component: staff,
        meta: {
            title: "Staff Homepage",

        }
    },
    {
        path: '/userProfile',
        component: userProfile,
        meta: {
            title: "User Profile",

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