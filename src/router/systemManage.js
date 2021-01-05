import Container from '@/container/index'

export default {
  path: '/systemManage',
  name: 'systemManage',
  redirect: '/systemManage/user/list',
  meta: { title: 'routes.systemManage', icon: 'el-icon-extend-dashboard' },
  component: Container,
  children: [
    {
      path: 'user/list',
      name: 'userList',
      meta: { title: 'routes.userList', showParent: true, keepAlive: true },
      component: () => import(/* webpackChunkName: "systemManage" */ '@/views/systemManage/user/list/index.vue')
    },
    {
      path: 'user/:id/detail',
      name: 'userDetail',
      meta: { title: 'routes.userDetail', hidden: true, index: '/systemManage/user/list' },
      component: () => import(/* webpackChunkName: "systemManage" */ '@/views/systemManage/user/detail/index.vue')
    },
    {
      path: 'role/list',
      name: 'roleList',
      meta: { title: 'routes.roleList', showParent: true, keepAlive: true },
      component: () => import(/* webpackChunkName: "systemManage" */ '@/views/systemManage/role/list/index.vue')
    },
    {
      path: 'role/:id/detail',
      name: 'roleDetail',
      meta: { title: 'routes.roleDetail', hidden: true, index: '/systemManage/role/list' },
      component: () => import(/* webpackChunkName: "systemManage" */ '@/views/systemManage/role/detail/index.vue')
    }
  ]
}
