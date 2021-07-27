import { createRouter, createWebHashHistory } from 'vue-router'
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
  history: createWebHashHistory(),
  routes
})

export default router
