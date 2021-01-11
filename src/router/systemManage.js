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
      name: 'user',
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
      name: 'role',
      meta: { title: 'routes.roleList', showParent: true, keepAlive: true },
      component: () => import(/* webpackChunkName: "systemManage" */ '@/views/systemManage/role/list/index.vue')
    },
    {
      path: 'role/add',
      name: 'roleAdd',
      meta: { title: 'routes.roleAdd', hidden: true, index: '/systemManage/role/list' },
      component: () => import(/* webpackChunkName: "systemManage" */ '@/views/systemManage/role/detail/index.vue')
    },
    {
      path: 'role/:id/edit',
      name: 'roleEdit',
      meta: { title: 'routes.roleEdit', hidden: true, index: '/systemManage/role/list' },
      component: () => import(/* webpackChunkName: "systemManage" */ '@/views/systemManage/role/detail/index.vue'),
      props: true
    }
  ]
}
