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
const ClassroomSchedule = () => import('@/views/master/classroom/ClassroomSchedule')
const ClassroomDashboard = () => import('@/views/master/classroom/Dashboard')
const ClassroomLive = () => import('@/views/master/classroom/ClassroomLive')
const ClassroomLiveAdd = () => import('@/views/master/classroom/ClassroomLiveAdd')
const ClassroomJoin = () => import('@/views/master/classroom/ClassroomJoin')

const SubjectIndex = () => import('@/views/master/subject/Index')
const SubjectData = () => import('@/views/master/subject/Subject')
const SubjectMe = () => import('@/views/master/subject/SubjectMe')

const StandartIndex = () => import('@/views/standart/Index')
const StandartData = () => import('@/views/standart/Standart')

const LectureIndex = () => import('@/views/lecture/Index')
const LectureData = () => import('@/views/lecture/Lecture')
const LectureAdd = () => import('@/views/lecture/Add')
const LectureView = () => import('@/views/lecture/View')
const LectureEdit = () => import('@/views/lecture/Edit')
const LectureStudent = () => import('@/views/lecture/Student')

const TaskIndex = () => import('@/views/task/Index')
const TaskData = () => import('@/views/task/Task')
const TaskAdd = () => import('@/views/task/Add')
const TaskView = () => import('@/views/task/View')
const TaskEdit = () => import('@/views/task/Edit')
const TaskStudent = () => import('@/views/task/Student')
const TaskResult = () => import('@/views/task/Result')
const TaskCheck = () => import('@/views/task/Check')

const ReportIndex = () => import('@/views/report/Index')
const ReportAbcent = () => import('@/views/report/Abcent')

const SettingIndex = () => import('@/views/setting/Index')
const SettingDashboard = () => import('@/views/setting/Dashboard')
const SettingSchool = () => import('@/views/setting/School')

const EventIndex = () => import('@/views/event/Index')
const EventData = () => import('@/views/event/Event')
const EventShow = () => import('@/views/event/View')

const InfoIndex = () => import('@/views/info/Index')
const InfoData = () => import('@/views/info/Info')

const ExamIndex = () => import('@/views/exam/Index')
const ExamBank = () => import('@/views/exam/Bank')
const ExamBankQuestion = () => import('@/views/exam/question/Question')
const ExamBankQuestionAdd = () => import('@/views/exam/question/Add')
const ExamBankQuestionEdit = () => import('@/views/exam/question/Edit')
const ExamBankQuestionImport = () => import('@/views/exam/question/Import')
const ExamSchedule = () => import('@/views/exam/Schedule')
const ExamEsayCheck = () => import('@/views/exam/result/Check')
const ExamPoint = () => import('@/views/exam/result/Point')

const ExamLayout = () => import('@/views/layout/Exam')
const ExamDash = () => import('@/views/exam/student/Dashboard')
const ExamWait = () => import('@/views/exam/student/Waiting')
const ExamDoing = () => import('@/views/exam/student/Exam')
const ExamFinish = () => import('@/views/exam/student/Finish')

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
            path: 'classroom',
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
                path: 'me/:id/schedule',
                name: 'master.classroom.me.schedule',
                component: ClassroomSchedule
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
              },
              {
                path: 'extraordinary',
                name: 'master.classroom.student',
                component: ClassroomDashboard
              },
              {
                path: 'join',
                name: 'master.classroom.join',
                component: ClassroomJoin
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
          },
          {
            path: ':id',
            name: 'event.view',
            component: EventShow
          }
        ]
      },
      {
        path: 'standart',
        component: StandartIndex,
        children: [
          {
            path: '',
            name: 'standart.index',
            component: StandartData
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
            path: ':id/view',
            name: 'lecture.view',
            component: LectureView
          },
          {
            path: ':id/edit',
            name: 'lecture.edit',
            component: LectureEdit
          },
          {
            path: 'extraordinary',
            name: 'lecture.student',
            component: LectureStudent
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
            path: ':id/view',
            name: 'task.view',
            component: TaskView
          },
          {
            path: ':id/edit',
            name: 'task.edit',
            component: TaskEdit
          },
          {
            path: ':id/check',
            name: 'task.check',
            component: TaskCheck
          },
          {
            path: ':id/result',
            name: 'task.result',
            component: TaskResult
          },
          {
            path: 'extraordinary',
            name: 'task.student',
            component: TaskStudent
          }
        ]
      },
      {
        path: 'report',
        component: ReportIndex,
        children: [
          {
            path: 'absent',
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
      },
      {
        path: 'exam',
        component: ExamIndex,
        children: [
          {
            path: 'bank',
            name: 'exam.bank',
            component: ExamBank
          },
          {
            path: 'bank/:id/questions',
            name: 'exam.bank.questions',
            component: ExamBankQuestion
          },
          {
            path: 'bank/:id/question/add',
            name: 'exam.bank.question.add',
            component: ExamBankQuestionAdd
          },
          {
            path: 'bank/:id/question/:id_question/edit',
            name: 'exam.bank.question.edit',
            component: ExamBankQuestionEdit
          },
          {
            path: 'bank/:id/import',
            name: 'exam.bank.question.import',
            component: ExamBankQuestionImport
          },
          {
            path: 'schedule',
            name: 'exam.schedule',
            component: ExamSchedule
          },
          {
            path: 'schedule/:id/check',
            name: 'exam.schedule.check',
            component: ExamEsayCheck
          },
          {
            path: 'schedule/:id/point',
            name: 'exam.schedule.point',
            component: ExamPoint
          }
        ]
      }
    ]
  },
  {
    path: '/exam',
    component: ExamLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dash',
        name: 'exam.student',
        component: ExamDash
      },
      {
        path: 'waitingroom',
        name: 'exam.prepare',
        component: ExamWait
      },
      {
        path: 'extraordinary',
        name: 'exam.while',
        component: ExamDoing
      },
      {
        path: 'finish',
        name: 'exam.finish',
        component: ExamFinish
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
      store.commit('SET_LOAD_PAGE', true)
      next({ name: 'login' })
    } else {
      store.commit('SET_LOAD_PAGE', true)
      next()
    }
  } else {
    store.commit('SET_LOAD_PAGE', true)
    next()
  }

})

router.afterEach(() => {
  store.commit('SET_LOAD_PAGE', false)
  store.commit('SET_LOADING', false)
})

export default router
