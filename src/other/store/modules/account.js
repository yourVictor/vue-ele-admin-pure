import { constantRouterMap, asyncRouterMap } from '@/router'
import { getToken, setToken, removeToken, getAccount, setAccount, removeAccount } from '@/utils/authentication'
import { login } from '@/apis/account/index'

const account = getAccount()
const hasPermission = function (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
const filterAsyncRouter = function (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
export default {
  state: {
    token: getToken(),
    account: account,
    routes: constantRouterMap,
    addRoutes: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_ROUTES: (state, routes) => {
      state.routes = constantRouterMap.concat(routes)
      state.addRoutes = routes
    }
  },
  actions: {
    Login ({ commit }, data) {
      return new Promise(async (resolve, reject) => {
        const response = await login(data)
        if (response.success) {
          const account = response.data
          setAccount(account)
          commit('SET_ACCOUNT', account)
          setToken(account.access_token)
          commit('SET_TOKEN', account.access_token)
          resolve()
        } else {
          reject(new Error('error'))
        }
      })
    },
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRoutes
        if (roles && roles.indexOf('admin') >= 0) {
          accessedRoutes = asyncRouterMap
        } else {
          accessedRoutes = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve()
      })
    },
    Logout ({ commit }) {
      removeToken()
      commit('SET_TOKEN', '')
      removeAccount()
      commit('SET_ACCOUNT', {})
    }
  }
}
