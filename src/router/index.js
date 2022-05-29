import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    props: true
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/user/SignupView.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/LoginView.vue'),
    props: true
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/user/AccountView.vue'),
    props: true
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminView.vue'),
    props: true
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('@/views/products/ProductView.vue'),
    props: true
  },
  {
    path: '/update/:id',
    name: 'update',
    component: () => import('@/views/admin/UpdateProductView.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
