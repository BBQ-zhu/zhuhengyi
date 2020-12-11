//路由层，主要是为前端提供api接口，同时将输入control层的数据返回给前端
const Router = require('koa-router')
const KoaBody = require('koa-body')

const router = new Router()
const {controlDevices,controlCreateDevices,controlDelateDevices} = require('../control/devices') //引入control校验

//查询所有设备
router.post('/devices',KoaBody(), async (ctx) => {
    let data = await controlDevices()
    ctx.body = {
        data
    }
})

//添加新设备
router.post('/createdevices',KoaBody(), async (ctx)=>{
    let data = await controlCreateDevices(ctx.request.body)
    ctx.body = {
        data
    }
})

//删除设备
router.post('/delateDevices',KoaBody(), async (ctx)=>{
    let data = await controlDelateDevices(ctx.request.body)
    ctx.body = {
        data
    }
})
module.exports = router
