// Scaffolded with GPT-4

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => Home
  },
  {
    path: '/about',
    name: 'Contact',
    component: () => About
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})