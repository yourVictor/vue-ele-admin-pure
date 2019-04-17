const moment = require('moment')
const outputDir = process.env.outputDir === 'dist/production' ? `${process.env.outputDir}/${moment().format('YYYYMMDD/HH')}` : process.env.outputDir
module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: outputDir,
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: undefined,
  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  pwa: {
    name: 'VUE ELE ADMIN PURE'
  },
  // 本地服务器配置
  devServer: {
    open: process.platform === 'win32',
    port: 9777,
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
