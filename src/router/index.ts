import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import BlogContent from "../views/BlogContent.vue";
import BlogList from '../views/BlogList.vue'
import BlogAddEditor from "../views/BlogAddMdEditor.vue"
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [

        {
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
                    component: BlogAddEditor
                }, {
                    path: '/blogList',
                    name: 'blogList',
                    component: BlogList
                }]
        }, {
            path: '/Login',
            component: () => import('../views/Login.vue')
        }


    ]
})

export default router