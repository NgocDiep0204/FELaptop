import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../views/layouts/master.vue';
import Home from '../views/home.vue'
import Login from '../views/login.vue'
import Shop from '../views/client/shop.vue'
import Productdetail from '../views/client/productdetail.vue';
import Cart from '../views/client/cart.vue';
import Register from '../views/register.vue';
import Profile from '../views/client/profile.vue';

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
            {
                path: '/productdetail',
                name: 'productdetail',
                component: Productdetail
            },
            {
                path:'cart/:id',
                name: 'cart',
                component: Cart
            },
            {
                path: '/register',
                name: 'register',
                component: Register
            },
            {
                path: '/profile',
                name: 'profile',
                component: Profile
            }
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
