import Vue from 'vue'
import VueRouter from 'vue-router'
import Convert from '../views/Convert.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Convert',
        component: Convert
    },
    {
        path: '/courses',
        name: 'Courses',
        component: () => import ('../views/Courses.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router