import { constantRouterMap, asyncRouterMap } from '../../router'
import { getToken, setToken, removeToken, getAccount, setAccount, removeAccount } from '../../utils/authentication'
import { login } from '../../apis/account/index'

let account = getAccount()
export default {
  state: {
    token: getToken(),
    account: account,
    routes: constantRouterMap
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
    }
  },
  actions: {
    Login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(response => {
          const account = response.data
          setAccount(account)
          commit('SET_ACCOUNT', account)
          setToken(account.access_token || 'asd32423_.asdasds')
          commit('SET_TOKEN', account.access_token || 'asd32423_.asdasds')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRoutes
        if (roles.indexOf('admin') >= 0) {
          accessedRoutes = asyncRouterMap
        } else {
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
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
