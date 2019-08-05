<h1 align="center">vue-ele-admin-pure</h1>
<p align="center">
  <a href="https://github.com/vuejs/vue-cli">
    <img src="https://img.shields.io/badge/vue--cli-3.X-orange.svg" alt="vue-cli">
  </a>
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-orange.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.10.0-orange.svg" alt="element">
  </a>
  <a href="https://github.com/vuejs/vuex">
    <img src="https://img.shields.io/badge/vuex-3.0.1-orange.svg" alt="vuex">
  </a>
  <a href="https://github.com/vuejs/vue-router">
    <img src="https://img.shields.io/badge/vue--router-3.0.3-orange.svg" alt="vue-router">
  </a>

  <a href="https://github.com/axios/axios">
    <img src="https://img.shields.io/badge/axios-0.18.0-orange.svg" alt="axios">
  </a>
  <a href="https://github.com/yourVictor/vue-ele-admin-pure/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

# 预览
- [在线预览](https://yourvictor.github.io/vue-ele-admin-pure)

# 前言
- 纯净精致版中大后台管理系统
# 功能
- 登录/退出
- 国际化
- MOCK数据
- 自定义meta
- async/await
- 骨架屏
- 响应式布局【手机/PC】
- 多色图标
- 权限控制
- 自定义主题
- 多环境打包发布
- 本地Sever预览
- PWA（性能优化）
- CDN（性能优化）
# 创建项目
### 1、初始化：克隆项目到本地
```
$: git clone https://github.com/yourVictor/vue-ele-admin-pure.git my-project
```
### 2、安装依赖
```
$: cd my-project
$: yarn install    |  npm install
$: yarn run serve  |  npm run serve  // 开放环境预览
```
# 配置
### 1、打包环境配置
不同环境使用不同的配置文件【env: 基础配置文件，env.test: 测试环境配置文件，env.uat: uat环境配置文件，env.prod: env.production: 按日期保存每次打包生产环境的记录】

```
NODE_ENV = 'development'          // 编译环境：可取development、production
baseUrl = '/'                     // 项目资源访问路径
VUE_APP_ROUTER_BASE = '/'         // 路由访问路径
VUE_APP_ROUTER_MODE = 'history'   // 路由模式：可取hash、history[服务端需配置支持]
VUE_APP_API = ''                  // 项目接口BASE_API
VUE_APP_MOCK = true               // 项目是否使用MOCK模拟数据
```
# 打包发布
### 1、测试环境(发布目录dist/test)
```
$: yarn run build:test  |  npm run build:test
```
### 2、UAT环境(发布目录dist/uat)
```
$: yarn run build:uat   |  npm run build:uat
```
### 3、正式环境(发布目录dist/prod)
```
$: yarn run build:prod  |  npm run build:prod
```
# 微信赞赏
<img src="./public/img/donate/wechat_donate.jpg" width="260" alt="微信赞赏">

# 自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).
