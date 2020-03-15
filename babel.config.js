const plugins = ['@vue/babel-plugin-transform-vue-jsx']
// 生产环境移除console
if (process.env.VUE_APP_BUILD_TYPE === 'prod') {
  plugins.push('transform-remove-console')
}
module.exports = {
  plugins: plugins,
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
