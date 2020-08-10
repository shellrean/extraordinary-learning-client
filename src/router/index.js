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
      },
      {
        path: 'subject',
        component: () => import('@/views/master/subject/Index'),
        children: [
          {
            path: '',
            name: 'master.subject.index',
            component: () => import('@/views/master/subject/Subject')
          }
        ]
      }
    ]
  },
  {
    path: '/lecture',
    component: () => import('@/views/lecture/Index'),
    children: [
      {
        path: '',
        name: 'lecture.index',
        component: () => import('@/views/lecture/Lecture')
      },
      {
        path: 'add',
        name: 'lecture.add',
        component: () => import('@/views/lecture/Add')
      },
      {
        path: ':id',
        name: 'lecture.view',
        component: () => import('@/views/lecture/View')
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
  store.commit('CLEAR_ERROR')
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

router.afterEach(() => {
  store.commit('SET_LOADING', false)
})

export default router
