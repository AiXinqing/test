import Vue from 'vue'
import Router from 'vue-router'

const Redirect = () => import('@/views/redirect/index')
// 登录
const Login = () => import('@/views/login/index')
// 报错
const ErrorPage404 = () => import('@/views/error-page/404')
const ErrorPage401 = () => import('@/views/error-page/401')
// 页面
// const Dashboard = () => import('@/views/Home')
const Profile = () => import('@/views/profile/index')

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: Redirect
    }]
  },
  { path: '/login', hidden: true, component: Login },
  { path: '/404', hidden: true, component: ErrorPage404 },
  { path: '/401', hidden: true, component: ErrorPage401 },
  { path: '/dashboard', name: 'Dashboard', component: Layout },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'home',
  //     name: 'Dashboard',
  //     component: Dashboard,
  //     meta: {
  //       title: '首页',
  //       icon: 'dashboard',
  //       affix: true
  //     }
  //   }]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [{
      path: 'index',
      name: 'Profile',
      component: Profile,
      meta: {
        title: '个人中心',
        icon: 'user',
        noCache: true
      }
    }]
  }
]

export const asyncRoutes = {
}
const createRouter = () => new Router({
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
