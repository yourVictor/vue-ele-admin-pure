import Vue from 'vue'
import Router from 'vue-router'
import Container from './container/index'
import components from './routers/components'
import setting from './routers/setting'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/404',
    name: 'error',
    meta: { title: '404', hidden: true },
    component: () => import(/* webpackChunkName: "error" */ '@/views/error/404.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录', hidden: true },
    component: () => import(/* webpackChunkName: "account" */ '@/views/account/login/index.vue')
  },
  {
    path: '',
    meta: { title: 'routes.dashboard', icon: 'el-icon-extend-dashboard' },
    redirect: '/dashboard',
    component: Container,
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      meta: { title: 'routes.dashboard', showParent: false },
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
    }]
  }
]
export const asyncRouterMap = [
  components,
  setting,
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]
export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_ROUTER_BASE,
  routes: constantRouterMap
})
