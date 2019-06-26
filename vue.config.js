const moment = require('moment')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const outputDir = process.env.outputDir === 'dist/production' ? `${process.env.outputDir}/${moment().format('YYYYMMDD/HH')}` : process.env.outputDir
const cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.6.0/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    'https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js'
  ]
}
module.exports = {
  publicPath: process.env.baseUrl,
  outputDir: outputDir,
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    sourceMap: IS_PRODUCTION
  },
  pwa: {
    name: 'VUE ELE ADMIN PURE'
  },
  chainWebpack: config => {
    // 生产环境配置
    if (IS_PRODUCTION) {
      // 生产环境注入cdn
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })

      config.plugin('compress')
        .use(CompressionWebpackPlugin)
        .tap(() => [{
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: false
        }])
    }
  },
  configureWebpack: config => {
    if (IS_PRODUCTION) {
      // 用cdn方式引入
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'echarts': 'echarts',
        'moment': 'moment'
      }
    }
  },
  // 本地服务器配置
  devServer: {
    open: process.platform === 'win32',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
