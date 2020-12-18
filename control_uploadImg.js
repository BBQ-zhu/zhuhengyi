const {returnError,returnSuccess} = require('../control/returnValue') //统一返回格式模板
const {serverCreateUploadImg,serverDelateUploadImg} = require('../server/task') //引入server层，操作数据库

//添加任务
const controlCreateUploadImg = async function (CreateTask) {
    const data = await serverCreateUploadImg(CreateTask) //user为真则调用server层
    if(data){
        return returnSuccess(200,'创建任务成功',[])
    }else{
        return returnError(400,'创建任务失败',[])
    }

}
//删除任务
const controlDelateUploadImg = async function (DelateTask) {
    const data = await serverDelateUploadImg(DelateTask) //user为真则调用server层
    if(data){
        return returnSuccess(200,'删除任务成功',[])
    }else{
        return returnError(400,'删除任务失败',[])
    }

}
module.exports = {
    controlCreateUploadImg,
    controlDelateUploadImg
}
