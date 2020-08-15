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
const ClassroomMe = () => import('@/views/master/classroom/ClassroomMe')
const ClassroomDashboard = () => import('@/views/master/classroom/Dashboard')
const ClassroomLive = () => import('@/views/master/classroom/ClassroomLive')
const ClassroomLiveAdd = () => import('@/views/master/classroom/ClassroomLiveAdd')

const SubjectIndex = () => import('@/views/master/subject/Index')
const SubjectData = () => import('@/views/master/subject/Subject')
const SubjectMe = () => import('@/views/master/subject/SubjectMe')

const LectureIndex = () => import('@/views/lecture/Index')
const LectureData = () => import('@/views/lecture/Lecture')
const LectureAdd = () => import('@/views/lecture/Add')
const LectureView = () => import('@/views/lecture/View')

const TaskIndex = () => import('@/views/task/Index')
const TaskData = () => import('@/views/task/Task')
const TaskAdd = () => import('@/views/task/Add')
const TaskView = () => import('@/views/task/View')

const ReportIndex = () => import('@/views/report/Index')
const ReportAbcent = () => import('@/views/report/Abcent')

const SettingIndex = () => import('@/views/setting/Index')
const SettingDashboard = () => import('@/views/setting/Dashboard')
const SettingSchool = () => import('@/views/setting/School')

const EventIndex = () => import('@/views/event/Index')
const EventData = () => import('@/views/event/Event')

const InfoIndex = () => import('@/views/info/Index')
const InfoData = () => import('@/views/info/Info')

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
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'home',
        component: Dashboard,
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
              },
              {
                path: 'me',
                name: 'master.classroom.me',
                component: ClassroomMe
              },
              {
                path: ':id/dashboard',
                name: 'master.classroom.dashboard',
                component: ClassroomDashboard
              },
              {
                path: 'live/:id',
                name: 'master.classroom.live',
                component: ClassroomLive
              },
              {
                path: ':id/live/add',
                name: 'master.classroom.live.add',
                component: ClassroomLiveAdd
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
              },
              {
                path: 'me',
                name: 'master.subject.me',
                component: SubjectMe
              }
            ]
          }
        ]
      },
      {
        path: 'info',
        component: InfoIndex,
        children: [
          {
            path: '',
            name: 'info.index',
            component: InfoData
          }
        ]
      },
      {
        path: 'event',
        component: EventIndex,
        children: [
          {
            path: '',
            name: 'event.index',
            component: EventData
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
          },
          {
            path: 'add',
            name: 'task.add',
            component: TaskAdd
          },
          {
            path: ':id',
            name: 'task.view',
            component: TaskView
          }
        ]
      },
      {
        path: 'report',
        component: ReportIndex,
        children: [
          {
            path: 'abcent',
            name: 'report.abcent',
            component: ReportAbcent
          }
        ]
      },
      {
        path: 'setting',
        component: SettingIndex,
        children: [
          {
            path: '',
            name: 'setting.dashboard',
            component: SettingDashboard
          },
          {
            path: 'school',
            name: 'setting.school',
            component: SettingSchool
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
