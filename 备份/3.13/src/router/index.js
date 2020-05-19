import Vue from 'vue'
import VueRouter from 'vue-router'

const Redirect = () => import('@/views/redirect/index')
const Login = () => import('@/views/login/index')

const Home = () => import('@/views/')
const studentTable = () => import('@/views/mainPage/studentPopTable/')
const dashboard = () => import('@/views/mainPage/home')

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
    children: [
      { path: 'dashboard', name: 'dashboard', component: dashboard },
      { path: 'studentTab', name: 'studentTab', component: studentTable }
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
