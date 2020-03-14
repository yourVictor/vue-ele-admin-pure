var express = require('express')
var compression = require('compression')
var history = require('connect-history-api-fallback')
var app = express()
var portList = {
  test: 6100,
  uat: 7100,
  prod: 8100
}
var mode = 'test'
var project = 'AdminDefault'

try {
  mode = process.argv.splice(3)[0]
} catch (e) {
  console.log(e)
}
app.use(compression())
app.use(history())
app.use(express.static(`./dist/${project}/${mode}`))
app.listen(portList[mode], function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Start server【Local ${project} ${mode}】 at: http://localhost:${portList[mode]}\n`)
})
