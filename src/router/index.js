import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../views/layouts/master.vue';
import Home from '../views/home.vue'
import Login from '../views/login.vue'
import Shop from '../views/client/shop.vue'
const routes = [
    {
        path: '/',
        name: 'mainlayout',
        component: MainLayout,
        children: [
            {
                path: '/',
                name: '/',
                component: Home
            },
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/shop',
                name: 'shop',
                component: Shop
            },
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
