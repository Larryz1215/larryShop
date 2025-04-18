import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductList from '../views/ProductList.vue';
import Cart from '../views/Cart.vue';
import Product from '../views/Product.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductList },
  { path: '/products/:id', component: Product, props: true },
  { path: '/cart', component: Cart },
  { path: '/member', component: () => import('../views/Member.vue') },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/register', component: Register },
  { path: '/forgot-password', component: ForgotPassword },
];

export default createRouter({
  history: createWebHistory(),
  routes
});
