const Models = require('../../models/index')
//删除任务
const serverDelateTask = async function (DelateTask) {
    console.log(DelateTask.id)
    const delateTask_medium_tables = await Models.task_medium_tables.destroy({
        where: {
            task_id: DelateTask.id
        }
    })
    const delateTask = await Models.tasks.destroy({
        where: {
            id: DelateTask.id
        }
    })
    return true
}

//添加任务、更新任务
const serverCreateTask = async function (CreateTask) {
    
        // if (CreateTask[0].id) {
        //     const delateTask_medium_tables = await Models.task_medium_tables.destroy({
        //         where: {
        //             task_id: CreateTask[0].id
        //         }
        //     })
        //     const delateTask = await Models.tasks.destroy({
        //         where: {
        //             id: CreateTask[0].id
        //         }
        //     })
        // }
    
    

    for (let i in CreateTask) {
        //判断当前任务是新增还是修改
        

        var createTasks = await Models.tasks.create({
            active_all_price: CreateTask[i].active_all_price,
            active_place: CreateTask[i].active_place,
            active_time: CreateTask[i].active_time,
            company_name: CreateTask[i].company_name,
            remarks: CreateTask[i].remarks,
            displed: 1,
            user_id: '1',
        })
        //需要先创建tasks表，待生成id之后，在新增关联表的数据（task_id来源于主表的id）
        // for (let k in CreateTask[i].task_medium_tables) {
        //     var createTask_medium_tables = await Models.task_medium_tables.create({
        //         task_id: CreateTask[i].task_medium_tables[k].task_id,
        //         devices_one_id: CreateTask[i].task_medium_tables[k].devices_one_id,
        //         devices_two_id: CreateTask[i].task_medium_tables[k].devices_two_id,
        //         devices_two_num: CreateTask[i].task_medium_tables[k].devices_two_num,
        //         displed: 1,
        //     })
        // }



    }
    // if (createTask && createTask_medium_tables) {
    return true
    // }

}

//查询所有任务
const serverAllTask = async function () {
    const allTask = await Models.tasks.findAll({
        attributes: ['id', 'company_name', 'active_time', 'active_place', 'active_all_price', 'remarks', 'user_id'],
        include: [{
            model: Models.task_medium_tables //小写，不要写Taks
        }],
    })
    return serverAllDevices(allTask)

}

//查询一二级设备（内部使用）
const serverAllDevices = async (allTask) => {
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
    serverDelateTask
}
