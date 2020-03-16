var fs = require('fs')
var path = require('path')

var project = 'AdminDefault'
try {
  project = process.argv.splice(3)[0]
} catch (e) {
  console.log(e)
}
var fileList = [
  {
    srcPath: path.join(__dirname, `src/_projects/${project}/.env`),
    destPath: path.join(__dirname, '.env')
  },
  {
    srcPath: path.join(__dirname, `src/_projects/${project}/.env.test`),
    destPath: path.join(__dirname, '.env.test')
  },
  {
    srcPath: path.join(__dirname, `src/_projects/${project}/.env.uat`),
    destPath: path.join(__dirname, '.env.uat')
  },
  {
    srcPath: path.join(__dirname, `src/_projects/${project}/.env.prod`),
    destPath: path.join(__dirname, '.env.prod')
  },
  {
    srcPath: path.join(__dirname, `src/_projects/${project}/plugins/langs/zh.js`),
    destPath: path.join(__dirname, 'src/__common/plugins/i18n/zh.js')
  },
  {
    srcPath: path.join(__dirname, `src/_projects/${project}/plugins/langs/en.js`),
    destPath: path.join(__dirname, 'src/__common/plugins/i18n/en.js')
  }
]
console.log(`--- start project: ${project} ---`)
try {
  for (let i = 0; i < fileList.length; i++) {
    fs.copyFileSync(fileList[i].srcPath, fileList[i].destPath)
  }
} catch (e) {
  console.log('initConfigFile error: ', e)
}
