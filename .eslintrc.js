module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.VUE_APP_BUILD_TYPE === 'prod' ? 'error' : 'off',
    'no-debugger': process.env.VUE_APP_BUILD_TYPE === 'prod' ? 'error' : 'off',
    'no-async-promise-executor': 'off'
  }
}
