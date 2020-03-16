const CompressionWebpackPlugin = require('compression-webpack-plugin')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
    'https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js'
  ]
}
module.exports = {
  pages: {
    index: `src/_projects/${process.env.VUE_APP_PROJECT_NAME}/main.js`
  },
  publicPath: process.env.baseUrl,
  outputDir: `dist/${process.env.VUE_APP_PROJECT_NAME}/${process.env.VUE_APP_BUILD_TYPE}`,
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
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        echarts: 'echarts'
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
