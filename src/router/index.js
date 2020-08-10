import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Login = () => import('@/views/auth/Login')
const Dashboard = () => import('@/views/dashboard/Dashboard')
const Layout = () => import('@/views/layout/App')
const MasterIndex = () => import('@/views/master/Index')

const UserIndex = () => import('@/views/master/user/Index')
const UserData = () => import('@/views/master/user/User')

const StudentIndex = () => import('@/views/master/student/Index')
const StudentData = () => import('@/views/master/student/Student')

const ClassroomIndex = () => import('@/views/master/classroom/Index')
const ClassroomData = () => import('@/views/master/classroom/Classroom')

const SubjectIndex = () => import('@/views/master/subject/Index')
const SubjectData = () => import('@/views/master/subject/Subject')

const LectureIndex = () => import('@/views/lecture/Index')
const LectureData = () => import('@/views/lecture/Lecture')
const LectureAdd = () => import('@/views/lecture/Add')
const LectureView = () => import('@/views/lecture/View')

const TaskIndex = () => import('@/views/task/Index')
const TaskData = () => import('@/views/task/Task')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'home',
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: 'master',
        component: MasterIndex,
        children: [
          {
            path: 'user',
            component: UserIndex,
            children: [
              {
                path: '',
                name: 'master.user.index',
                component: UserData
              }
            ]
          },
          {
            path: 'student',
            component: StudentIndex,
            children: [
              {
                path: '',
                name: 'master.student.index',
                component: StudentData
              }
            ]
          },
          {
            path: 'clasroom',
            component: ClassroomIndex,
            children: [
              {
                path: '',
                name: 'master.classroom.index',
                component: ClassroomData
              }
            ]
          },
          {
            path: 'subject',
            component: SubjectIndex,
            children: [
              {
                path: '',
                name: 'master.subject.index',
                component: SubjectData
              }
            ]
          }
        ]
      },
      {
        path: 'lecture',
        component: LectureIndex,
        children: [
          {
            path: '',
            name: 'lecture.index',
            component: LectureData
          },
          {
            path: 'add',
            name: 'lecture.add',
            component: LectureAdd
          },
          {
            path: ':id',
            name: 'lecture.view',
            component: LectureView
          }
        ]
      },
      {
        path: 'task',
        component: TaskIndex,
        children: [
          {
            path: '',
            name: 'task.index',
            component: TaskData
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
