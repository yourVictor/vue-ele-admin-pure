import Container from '@/container/index'

export default {
  path: '/dashboard',
  meta: { title: 'routes.dashboard', icon: 'el-icon-extend-dashboard' },
  redirect: '/dashboard/index',
  component: Container,
  children: [
    {
      path: 'index',
      name: 'dashboard',
      meta: { title: 'routes.dashboard', showParent: false },
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
    }
  ]
}
