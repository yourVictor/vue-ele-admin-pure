import Vue from 'vue'
import Vuex from 'vuex'
import app from './stores/modules/app'
import account from './stores/modules/account'
import tagView from './stores/modules/tagView'
import getters from './stores/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    account,
    tagView
  },
  getters
})
