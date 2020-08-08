import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login')
  },
  {
    path: '/dashboard',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/master',
    component: () => import('@/views/master/Index'),
    children: [
      {
        path: 'user',
        component: () => import('@/views/master/user/Index'),
        children: [
          {
            path: '',
            name: 'master.user.index',
            component: () => import('@/views/master/user/User')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let auth = store.getters.isAuth
    if(!auth) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
