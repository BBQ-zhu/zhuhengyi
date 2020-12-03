const { LISTEN } = require('./config/const')
const Koa = require('koa')
const Cors = require('koa2-cors')
const app = new Koa()

//路由引入
const userIndex = require('./app/api/user')

app.use(Cors()) //解决跨域问题，位子必须介于路由引入和路由注册之间




//路由注册
app.use(userIndex.routes(), userIndex.allowedMethods())

app.listen(LISTEN, () => {
    console.log(LISTEN+'端口监听成功！')
})
