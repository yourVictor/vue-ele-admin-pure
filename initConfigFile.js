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
    srcPath: path.join(__dirname, `src/projects/${project}/.env`),
    destPath: path.join(__dirname, '.env')
  },
  {
    srcPath: path.join(__dirname, `src/projects/${project}/.env.test`),
    destPath: path.join(__dirname, '.env.test')
  },
  {
    srcPath: path.join(__dirname, `src/projects/${project}/.env.uat`),
    destPath: path.join(__dirname, '.env.uat')
  },
  {
    srcPath: path.join(__dirname, `src/projects/${project}/.env.prod`),
    destPath: path.join(__dirname, '.env.prod')
  }
]
console.log(`--- start project: ${project} ---`)
for (let i = 0; i < fileList.length; i++) {
  fs.copyFileSync(fileList[i].srcPath, fileList[i].destPath)
}
