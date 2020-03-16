import Vue from 'vue'
import { filters } from '../utils/tools'

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
