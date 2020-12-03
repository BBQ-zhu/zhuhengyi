//路由层，主要是为前端提供api接口，同时将输入control层的数据返回给前端
const Router = require('koa-router')
const KoaBody = require('koa-body')
// const { URL, LISTEN } = require('../../config/const.js')
//如果导出界面的是model.exports={users}则在这里引入时也需要const {user}引入
const router = new Router()
const {controlAllUser,controlUser,controlCreateUser} = require('../control/user') //引入control校验

//查询所有用户
router.post('/allUser',KoaBody(), async (ctx) => {
    //将前端传进来的参数送入conrol层校验
    let data = await controlAllUser()
    ctx.body = {
        data
    }
})

//注册用户，查询名称是否已存在
router.post('/user', KoaBody(), async (ctx) => {
    //将前端传进来的参数送入conrol层校验
    let data = await controlUser(ctx.request.body)
    ctx.body = {
        data
    }
})

//添加新用户
router.post('/createUser',KoaBody(), async (ctx)=>{
    let data = await controlCreateUser(ctx.request.body)
    ctx.body = {
        data
    }
})

module.exports = router
