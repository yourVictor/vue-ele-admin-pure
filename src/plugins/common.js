import Vue from 'vue'
import { MessageBox } from 'element-ui'
import store from '@/store'
import i18n from '@/plugins/i18n/index'
import config, { debounce } from '@/utils/config'
import { regexp } from '@/utils/regexp'

let logoutTimer = null
let logoutFlag = false
const common = {}
common.install = function (Vue) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive-color', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
      el.style = 'color: ' + binding.value()
    },
    inserted (el, binding, vnode, oldVnode) {},
    update (el, binding, vnode, oldVnode) {},
    componentUpdated (el, binding, vnode, oldVnode) {},
    unbind (el, binding, vnode, oldVnode) {}
  })

  // 3. 注入组件[混入]
  Vue.mixin({
    created: function () {
      // 逻辑...
    },
    updated: debounce(function () {
      if (this.$route.name === 'login') {
        return
      }
      // 长时间未操作自动退出登录
      clearTimeout(logoutTimer)
      logoutTimer = setTimeout(() => {
        store.dispatch('Logout').then(() => {
          if ((this.$route && this.$route.name === 'login') || logoutFlag) {
            return false
          }
          logoutFlag = true
          MessageBox.alert(i18n.t('pages.common.logoutWarnText'), i18n.t('pages.common.logoutWarnTitle'), {
            showClose: false,
            type: 'warning',
            confirmButtonText: '确定',
            callback: action => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            }
          })
        })
      }, 1000 * 60 * config.timeToLogout)
    }, 1000, false),
    methods: {
      hello () {
        // eslint-disable-next-line
        console.log('hello is called...')
      }
    }
  })

  // 4. 添加实例方法
  Vue.prototype.commonRule = {
    // 不能为空
    noNullRule: [
      { required: true, message: '不能为空', trigger: 'blur' }
    ],
    // 密码规则
    passwordRule: [
      { pattern: regexp.password, message: '格式错误：数字、字母和下划线（至少包含其中两种，非数字开头，5-12位）', trigger: 'blur' }
    ],
    // 价格规则
    priceRule: [
      { required: true, message: '不能为空', trigger: 'change' },
      { pattern: regexp.money, message: '格式错误：须大于0小于1000000且最多保留两位小数', trigger: 'change' }
    ],
    // URL规则
    urlRule: [
      { pattern: regexp.url, message: '必须为正确格式的URL', trigger: 'change' }
    ],
    // 邮箱规则
    emailRule: [
      { pattern: regexp.email, message: '必须为正确格式的邮箱', trigger: 'change' }
    ],
    // 手机号规则
    telRule: [
      { pattern: regexp.tel, message: '必须为正确格式的手机号', trigger: 'change' }
    ],
    // 座机规则
    phoneRule: [
      { pattern: regexp.phone, message: '必须为正确格式的座机号码', trigger: 'change' }
    ],
    // 折扣规则
    discountRule: [],
    // 排序规则
    sortRule: []
  }
  // 上传文件判断
  Vue.prototype.beforeUpload = function (file) {
    if (!/image/.test(file.type)) {
      this.$message.error('只能上传图片')
      return false
    }
    if (file.size > 1024 * 1024) {
      this.$message.error('图片不能大于1M')
      return false
    }
  }
  // 下载文件
  Vue.prototype.downloadFile = function (data, filename) {
    if (!data) {
      return false
    } else {
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(new Blob([data]), filename || 'excel.xls')
      } else {
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', filename || 'excel.xls')
        document.body.appendChild(link)
        link.click()
      }
    }
  }
  // 列表索引
  Vue.prototype.indexMethod = function (index, listQuery) {
    return ((listQuery.pageIndex || 1) - 1) * (listQuery.pageSize || 20) + index + 1
  }
}

Vue.use(common)
