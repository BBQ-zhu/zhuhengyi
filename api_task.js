const Router = require('koa-router')
const KoaBody = require('koa-body')
const router = new Router()
const {controlAllTask,controlCreateTask,controlDelateTask} = require('../control/task') //引入control校验


//查询所有任务
router.post('/allTask',KoaBody(), async (ctx) => {
    //将前端传进来的参数送入conrol层校验
    let data = await controlAllTask()
    ctx.body = {
        data
    }
})

//添加任务
router.post('/createTask',KoaBody(), async (ctx) => {
    //将前端传进来的参数送入conrol层校验
    let data = await controlCreateTask(ctx.request.body)
    ctx.body = {
        data
    }
})
//删除任务
router.post('/delateTask',KoaBody(), async (ctx) => {
    //将前端传进来的参数送入conrol层校验
    let data = await controlDelateTask(ctx.request.body)
    ctx.body = {
        data
    }
})
module.exports = router
