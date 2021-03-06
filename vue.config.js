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
  publicPath: process.env.baseUrl,
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    sourceMap: IS_PRODUCTION,
    loaderOptions: {
      // scss预设器配置项
      scss: {
        prependData: `
          @import "./src/styles/_variables.scss";
          @import "./src/styles/_mixins.scss";
        `
      }
    }
  },
  pwa: {
    name: 'VUE ELE ADMIN PURE'
  },
  chainWebpack: config => {
    // 生产环境配置
    if (IS_PRODUCTION) {
      // 生产环境注入cdn
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })

      config
        .plugin('compress')
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false // 是否删除原文件
          }
        ])
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
