const { LISTEN } = require('./config/const')
const Koa = require('koa')
const Cors = require('koa2-cors')
const app = new Koa()

//路由引入
const user = require('./app/api/user')
const devices = require('./app/api/devices')
const task = require('./app/api/task')

app.use(Cors()) //解决跨域问题，位子必须介于路由引入和路由注册之间

//路由注册
app.use(user.routes(), user.allowedMethods())
app.use(devices.routes(), devices.allowedMethods())
app.use(task.routes(), task.allowedMethods())

app.listen(LISTEN, () => {
    console.log(LISTEN+'端口监听成功！')
})
