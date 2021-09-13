import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../../views/index.vue'
import profile from '../../views/profile.vue'
import signup from '../../views/signup.vue'
import calendar from '../../views/calendar.vue'

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
  }, 
  {
    path: '/calendar',
    name: 'calendar', 
    component: calendar
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
