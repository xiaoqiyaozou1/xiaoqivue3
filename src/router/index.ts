import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import BlogContent from "../components/BlogContent.vue";
import BlogAdd from '../components/BlogAdd.vue'
import BlogList from '../components/BlogList.vue'
import BlogEdit from '../components/BlogEdit.vue'

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/',
                redirect: 'blogList'
            },
            {
                path: '/blogContent',
                name: 'blogContent',
                component: BlogContent,
            },
            {
                path: '/blodAdd',
                name: 'blogAdd',
                component: BlogAdd
            }, {
                path: '/blogList',
                name: 'blogList',
                component: BlogList
            }, {
                path: '/blogEdit',
                name: 'blogEdit',
                component: BlogEdit
            }]
    }
    ]
})

export default router