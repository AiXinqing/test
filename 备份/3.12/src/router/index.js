import Vue from 'vue'
import VueRouter from 'vue-router'

const Redirect = () => import('@/views/redirect/index')
const Login = () => import('@/views/login/index')
const Home = () => import('@/views/index')

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/redirect/:path*',
    component: Redirect
  },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const createRouter = () => new VueRouter({
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
