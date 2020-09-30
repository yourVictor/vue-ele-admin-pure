module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.VUE_APP_BUILD_TYPE === 'PROD' ? 'error' : 'off',
    'no-async-promise-executor': 'off'
  }
}
