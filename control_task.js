const {returnError,returnSuccess} = require('../control/returnValue') //统一返回格式模板
const {serverAllTask,serverCreateTask,serverDelateTask} = require('../server/task') //引入server层，操作数据库

//查询所有任务
const controlAllTask = async function () {
    const data = await serverAllTask() //user为真则调用server层
    if(data){

        let arr = data.map((item) => {
            return item.dataValues
        })
        return returnSuccess(200,'查询所有任务成功',arr)
    }else{
        return returnError(400,'查询所有任务失败',[])
    }

}
//添加任务
const controlCreateTask = async function (CreateTask) {
    const data = await serverCreateTask(CreateTask) //user为真则调用server层
    if(data){
        return returnSuccess(200,'创建任务成功',[])
    }else{
        return returnError(400,'创建任务失败',[])
    }

}
//删除任务
const controlDelateTask = async function (DelateTask) {
    const data = await serverDelateTask(DelateTask) //user为真则调用server层
    if(data){
        return returnSuccess(200,'删除任务成功',[])
    }else{
        return returnError(400,'删除任务失败',[])
    }

}
module.exports = {
    controlAllTask,
    controlCreateTask,
    controlDelateTask
}
