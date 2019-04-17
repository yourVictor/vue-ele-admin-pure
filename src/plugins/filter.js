import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function (date, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (date) {
    let str = (moment(date).utcOffset(8)).format(pattern.replace(/-/g, '/'))
    if (pattern.match('-')) {
      return str.replace(/\//g, '-')
    }
    return str
  }
  return '-'
})
