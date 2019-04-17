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

export default {
  appName: pkg.name,
  hasSideMinWidth: 768,
  timeToLogout: 10, // 单位：分钟
  headerFixed: true
}
