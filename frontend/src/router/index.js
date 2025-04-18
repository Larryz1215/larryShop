import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductList from '../views/ProductList.vue';
import Cart from '../views/Cart.vue';
import Product from '../views/Product.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductList },
  { path: '/products/:id', component: Product, props: true },
  { path: '/cart', component: Cart },
  { path: 'member', component: () => import('../views/Member.vue') },
];

export default createRouter({
  history: createWebHistory(),
  routes
});
