import { createRouter, createWebHistory } from 'vue-router'
import index from '../../views/index.vue'
import profile from '../../views/profile.vue'
import signup from '../../views/signup.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  }
]

const router = createRouter({
  mode: 'hash',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
