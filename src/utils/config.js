import moment from 'moment'
const pkg = require('../../package')
export function debounce (fn, interval, once) {
  let timeout
  return function () {
    if (!timeout) {
      fn.apply(this, arguments)
    } else if (once) {
      clearTimeout(timeout)
      timeout = null
    }

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null
      }, interval)
    }
  }
}
export function formatDate (date, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (date) {
    let str = (moment(date).utcOffset(8)).format(pattern.replace(/-/g, '/'))
    if (pattern.match('-')) {
      return str.replace(/\//g, '-')
    }
    return str
  }
  return '-'
}

export default {
  appName: pkg.name,
  hasSideMinWidth: 768,
  timeToLogout: 10, // 单位：分钟
  headerFixed: true
}
