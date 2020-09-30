import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
const errorControl = message => {
  Message({
    message: reg.test(message) ? message : '服务器异常，请稍后再试',
    type: 'error',
    duration: 3 * 1000
  })
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API, // api的baseURL
  timeout: 60000 // 请求超时时间,
})

// request拦截器
service.interceptors.request.use(
  config => {
    // config.data = qs.stringify(config.data)
    if (store.getters.token) {
      config.headers['X-Token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const resData = response.data
    const headers = response.headers
    if (headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8') {
      return resData
    }
    if (response.config.responseType === 'blob') {
      var b = new Blob([resData])
      var r = new FileReader()
      r.readAsText(b, 'utf-8')
      r.onload = function() {
        const result = JSON.parse(r.result)
        errorControl(result.message || result.msg)
      }
      return {
        success: false
      }
    } else if (resData.status !== 200) {
      errorControl(resData.message || resData.msg)
    }

    return {
      success: resData.status === 200,
      ...resData
    }
  },
  error => {
    errorControl(error.response && error.response.data ? error.response.data.message : '服务器异常，请稍后再试')
    return {
      success: false,
      e: error
    }
  }
)

export default service
