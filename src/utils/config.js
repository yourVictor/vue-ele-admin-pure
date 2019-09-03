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

export function formatMoney (money, dot = true, digit = 2) {
  if (!dot) {
    return (parseFloat(money) || 0).toFixed(digit)
  }
  var moneyArray = (parseFloat(money) || 0).toFixed(digit).split('.')
  var num = moneyArray[0]
  var result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  if (moneyArray.length > 1) {
    result += '.' + moneyArray[1]
  }
  return result
}

export default {
  appName: pkg.name,
  hasSideMinWidth: 768,
  timeToLogout: 30, // 单位：分钟
  headerFixed: true
}
