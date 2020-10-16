/*
 * @Author: wangzm
 * @Date: 2020-03-09 10:56:00
 * @LastEditors: wangzm
 * @LastEditTime: 2020-03-09 10:59:20
 * @Description: file content
 */
import format from 'date-fns/format'
const pkg = require('../../package')
export function debounce(fn, interval, once) {
  let timeout
  return function() {
    if (!timeout) {
      fn.apply(this, arguments)
    } else if (once) {
      clearTimeout(timeout)
      timeout = null
    }

    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null
      }, interval)
    }
  }
}
/*
 * 函数：时间格式化
 * author: wangzm
 * 参数：date[null、undefined、''、Date、时间戳]、pattern：格式[字符串，非必填]
 * 返回：格式化的时间字符串
 */
export function formatDate(date, pattern = 'yyyy-MM-dd HH:mm:ss') {
  if (date) {
    const originDate = typeof date === 'string' ? new Date(date) : date
    const str = format(originDate, pattern)
    return str
  }
  return '-'
}

export function formatMoney(money, dot = true, digit = 2) {
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
  headerFixed: true,
  loginWhiteList: ['/login'] // 免登录白名单
}
