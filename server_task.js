const Models = require('../../models/index')


//添加任务、更新任务
const serverCreateTask = async function (CreateTask) {
    // console.log(CreateTask)
    if (CreateTask.id) {
        var createTasks = await Models.tasks.update({
            active_all_price: CreateTask.active_all_price,
            active_place: CreateTask.active_place,
            active_time: CreateTask.active_time,
            company_name: CreateTask.company_name,
            remarks: CreateTask.remarks,
            displed: 1,
            user_id: 1
        }, {
            where: {
                id: CreateTask.id
            }
        })
    } else {
        var createTasks = await Models.tasks.create({
            active_all_price: CreateTask.active_all_price,
            active_place: CreateTask.active_place,
            active_time: CreateTask.active_time,
            company_name: CreateTask.company_name,
            remarks: CreateTask.remarks,
            displed: 1,
            user_id: 1
        })
    }

    return true
}
//增加一二级设备
const createTask_medium_tables = async function (CreateTask) {
    // console.log(CreateTask)
    var createTask_medium_table = await Models.task_medium_tables.create({
        task_id: CreateTask.task_id,
        devices_one_id: CreateTask.devices_one_id,
        devices_two_id: CreateTask.devices_two_id,
        devices_two_num: CreateTask.devices_two_num,
        displed: 1,
    })
    return true
}
//删除二级设备
const delateTask_medium_tables = async function (DelateTask) {
    var createTask_medium_table = await Models.task_medium_tables.destroy({
        where: {
            task_id: DelateTask.task_id,
            devices_two_id: DelateTask.devices_two_id
        }
    })
    return true
}

//删除整个任务及下属设备
const serverDelateTask = async function (DelateTask) {
    const delateTask_medium_tables = await Models.task_medium_tables.destroy({
        where: {
            task_id: DelateTask.task_id
        }
    })
    const delateTask = await Models.tasks.destroy({
        where: {
            id: DelateTask.task_id
        }
    })
    return true
}
//查询所有任务及下属设备
const serverAllTask = async function (AllTask) {

    const allTask = await Models.tasks.findAll({
        attributes: ['id', 'company_name', 'active_time', 'active_place', 'active_all_price', 'remarks', 'user_id'],
        include: [{
            model: Models.task_medium_tables //小写，不要写Taks
        }],
        // order: ['id desc'],
        limit: parseInt(AllTask.limit), //每一页条数
        offset: parseInt(AllTask.offset) //第几页
    })

    return serverAllDevices(allTask)

}

//查询一二级设备（内部使用）
const serverAllDevices = async (allTask) => {
    // console.log(allTask)
    for (let i = 0; i < allTask.length; i++) {
        var arrOne = allTask[i].dataValues
        for (let k = 0; k < arrOne.task_medium_tables.length; k++) {
            var arrTwo = arrOne.task_medium_tables[k].dataValues
            arrTwo.device_two_name = []
            let allDevies_one = await Models.devices_ones.findOne({
                attributes: ['id', 'device_name'],
                where: {
                    id: arrTwo.devices_one_id
                }
            })
            arrTwo.device_one_name = allDevies_one.dataValues.device_name //添加device_one_name字段
            let allDevies_two = await Models.devices_twos.findOne({
                attributes: ['id', 'device_name', 'device_price'],
                where: {
                    id: arrTwo.devices_two_id
                }
            })

            allDevies_two.dataValues.devices_one_id = arrTwo.devices_one_id
            allDevies_two.dataValues.devices_two_id = arrTwo.devices_two_id
            allDevies_two.dataValues.devices_two_num = arrTwo.devices_two_num
            arrTwo.device_two_name.push(allDevies_two.dataValues) //添加字段
        }
    }

    for (let i = 0; i < allTask.length; i++) {
        var arrOne = allTask[i].dataValues
        var result = [];
        var obj = {};
        for (let k = 0; k < arrOne.task_medium_tables.length; k++) {
            var arrTwo = arrOne.task_medium_tables[k].dataValues
            if (!obj[arrTwo.devices_one_id]) { //判断一级是否重复，重复则只保留一个
                result.push(arrTwo);
                obj[arrTwo.devices_one_id] = true;
            } else {
                result.forEach((item, index) => {
                    if (item.devices_one_id == arrTwo.devices_one_id) {
                        item.device_two_name = item.device_two_name.concat(arrTwo.device_two_name)
                    }
                })
            }
        }
        arrOne.task_medium_tables = result
    }
    return allTask
}
 

module.exports = {
    serverAllTask,
    serverCreateTask,
    serverDelateTask,
    delateTask_medium_tables,
    createTask_medium_tables
}
