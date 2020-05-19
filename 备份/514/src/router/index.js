import Vue from 'vue'
import VueRouter from 'vue-router'

// const Redirect = () => import('@/views/redirect/')
const Login = () => import('@/views/login/')

const Home = () => import('@/views/')
const LEATable = () => import('@/views/mainPage/TablePage/')

const dashboard = () => import('@/views/mainPage/home/index')
const noData = () => import('@/views/mainPage/home/noData')
const EducationBureau = () => import('@/views/mainPage/EducationBureauCharts')
const shchoolCharts = () => import('@/views/mainPage/shchoolCharts/')
const facultyCharts = () => import('@/views/mainPage/facultyCharts/')
const classCharts = () => import('@/views/mainPage/classCharts/')
const studentCharts = () => import('@/views/mainPage/studentCharts/')

Vue.use(VueRouter)

export const constantRoutes = [
  // {
  //   path: '/redirect/:path*',
  //   component: Redirect
  // },
  { path: '', name: 'login', component: Login },
  {
    path: '/home',
    name: 'home',
    component: Home,
    // redirect: '/home',
    children: [
      { path: ':objectId/dashboard', name: 'dashboard', component: dashboard },
      { path: ':objectId/noData', name: 'noData', component: noData },

      { path: ':objectId/LEATable/analysis=:analysis', name: 'LEATable', component: LEATable },

      { path: ':objectId/EducationBureau/analysis=:analysis', name: 'EducationBureau', component: EducationBureau }, // 教育局图表
      { path: ':objectId/shchoolCharts/analysis=:analysis', name: 'shchoolCharts', component: shchoolCharts }, // 学校图表
      { path: ':objectId/facultyCharts/analysis=:analysis', name: 'facultyCharts', component: facultyCharts }, // 教职工图表
      { path: ':objectId/classCharts/analysis=:analysis', name: 'classCharts', component: classCharts }, // 班级图表
      { path: ':objectId/studentCharts/analysis=:analysis', name: 'studentCharts', component: studentCharts }, // 学生图表

      { path: '*', redirect: '/' }
    ]
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
