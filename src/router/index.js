import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Home from "../views/Home.vue"

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