const Models = require('../../models/index')
//添加图片
const serverCreateUploadImg = async function (CreateTask) {

        var createTasks = await Models.tasks.create({
            
        })
    
    return true
}
//删除图片
const serverDelateUploadImg = async function (DelateTask) {

    const delateTask_medium_tables = await Models.task_medium_tables.destroy({
        where: {
            task_id: DelateTask.id
        }
    })

    return true
}

module.exports = {
    serverCreateUploadImg,
    serverDelateUploadImg
}
