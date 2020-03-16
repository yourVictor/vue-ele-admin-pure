import format from 'date-fns/format'

// ------------------ filters ------------------
/*
 * 函数：时间格式化
 * author: Mole
 * 参数：date[null、undefined、''、Date、时间戳]、pattern：格式[字符串，非必填]
 * 返回：格式化的时间字符串
 */
export function formatDate (date, pattern = 'yyyy-MM-dd HH:mm:ss') {
  if (date) {
    const originDate = typeof date === 'string' ? new Date(date) : date
    const str = format(originDate, pattern)
    return str
  }
  return '-'
}

/*
 * 函数：金额格式化
 * author: Mole
 * 参数：money[null、undefined、''、Number、数字字符串]、dot：是否每三位逗号隔开、digit：保留小数的位数
 * 返回：格式化的金额字符串
 */

export function formatMoney (money, digit = 2, dot = false) {
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

export const filters = {
  formatDate,
  formatMoney
}
