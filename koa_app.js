const { LISTEN } = require('./config/const')
const Koa = require('koa')
const Cors = require('koa2-cors')
// const serve = require("koa-static") //静态资源
const app = new Koa()
const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 400*1024*1024    // 设置上传文件大小最大限制，默认4M
    }
}));

//路由引入
const user = require('./app/api/user')
const devices = require('./app/api/devices')
const task = require('./app/api/task')
const uploadImg = require('./app/api/uploadImg')
app.use(Cors()) //解决跨域问题，位子必须介于路由引入和路由注册之间
// app.use(serve(path.join(__dirname, '/public')));

//路由注册
app.use(user.routes(), user.allowedMethods())
app.use(devices.routes(), devices.allowedMethods())
app.use(task.routes(), task.allowedMethods())
app.use(uploadImg.routes(), uploadImg.allowedMethods())

app.listen(LISTEN, () => {
    console.log(LISTEN+'端口监听成功！')
})
