import Vue from 'vue'
import { formatDate, formatMoney } from '@/utils/config'

Vue.filter('formatDate', formatDate)
Vue.filter('formatMoney', formatMoney)
