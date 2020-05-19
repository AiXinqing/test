import Vue from 'vue'
import VueRouter from 'vue-router'

const Redirect = () => import('@/views/redirect/')
const Login = () => import('@/views/login/')

const Home = () => import('@/views/')
const studentTable = () => import('@/views/mainPage/studentPopTable/')
const dashboard = () => import('@/views/mainPage/home/index')
const stuChart = () => import('@/views/mainPage/studentChart')

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/redirect/:path*',
    component: Redirect
  },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/home',
    name: 'home',
    component: Home,
    // redirect: '/home/',
    children: [
      { path: 'dashboard', name: 'dashboard', component: dashboard },
      { path: 'studentTab', name: 'studentTab', component: studentTable },
      { path: 'stuChart', name: 'stuChart', component: stuChart },
      { path: '*', component: dashboard }
    ]
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',
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
