/*
 * @Author: wangzm
 * @Date: 2020-03-09 10:42:17
 * @LastEditors: wangzm
 * @LastEditTime: 2020-03-09 11:04:12
 * @Description: file content
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/modules/app'
import account from '@/store/modules/account'
import tagView from '@/store/modules/tagView'
import getters from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    account,
    tagView
  },
  getters
})
