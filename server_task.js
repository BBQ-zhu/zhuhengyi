const Models = require('../../models/index')
const Op = Models.Sequelize.Op // 大写Sequelize

//添加任务、更新任务
const serverCreateTask = async function (CreateTask) {
    console.log(CreateTask)
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
        return true
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
        return createTasks.dataValues
    }


}
//增加二级设备
const createTask_medium_tables = async function (CreateTask) {
    console.log(CreateTask)
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
    console.log(DelateTask)
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
    console.log(DelateTask)
    const delateImg = await Models.upload_imgs.destroy({
        where: {
            task_id: DelateTask.task_id
        }
    })
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
    console.log(AllTask)
    if(AllTask.startTime && AllTask.endTime){
        var where={
            active_time:{
                [Op.gte]: AllTask.startTime,  //>= 大于等于
                [Op.lte]: AllTask.endTime     //<= 小于等于
            },
            company_name:{ [Op.like]: '%'+ AllTask.company_name +'%' },
            active_place:{ [Op.like]: '%'+ AllTask.active_place +'%' }
        }
    }else{
        var where={
            company_name:{ [Op.like]: '%'+ AllTask.company_name +'%' },
            active_place:{ [Op.like]: '%'+ AllTask.active_place +'%' }
        }
    }

    const allTask = await Models.tasks.findAll({ //首页界面查询
        attributes: ['id', 'company_name', 'active_time', 'active_place', 'active_all_price', 'remarks', 'user_id'],
        include: [{
            model: Models.task_medium_tables, //小写，不要写Taks
            attributes: ['id', 'task_id', 'devices_one_id', 'devices_two_id', 'devices_two_num'],
        }, {
            model: Models.upload_imgs, 
            attributes: ['id', 'task_id', 'img_url'],
        }],
        order: [
            ['id', 'DESC']
        ],
        limit: parseInt(AllTask.limit),  //每一页条数
        offset: parseInt(AllTask.offset) //第几页  跳过的条数
    })

    const allTaskCount = await Models.tasks.findAll({  //统计界面多条件查询
        attributes: ['id', 'company_name', 'active_time', 'active_place', 'active_all_price', 'remarks', 'user_id'],
        include: [{
            model: Models.task_medium_tables, //小写，不要写Taks
            attributes: ['id', 'task_id', 'devices_one_id', 'devices_two_id', 'devices_two_num'],
        }, {
            model: Models.upload_imgs, //小写，不要写Taks
            attributes: ['id', 'task_id', 'img_url'],
        }],
        order: [
            ['id', 'DESC']
        ],
        limit: parseInt(AllTask.limit),  //每一页条数 // 获取数量,
        offset: parseInt(AllTask.offset), //第几页 // 跳过多少条, 然后再读取(应该累加)
        where:where
    })
 
    const allTaskExcel = await Models.tasks.findAll({ //统计界面excel下载
        attributes: ['id', 'company_name', 'active_time', 'active_place', 'active_all_price', 'remarks', 'user_id'],
        include: [{
            model: Models.task_medium_tables, //小写，不要写Taks
            attributes: ['id', 'task_id', 'devices_one_id', 'devices_two_id', 'devices_two_num'],
        }, {
            model: Models.upload_imgs, 
            attributes: ['id', 'task_id', 'img_url'],
        }],
        order: [
            ['active_time', 'DESC']
        ]
    })
    
    if(AllTask.statistics == '0'){  //首页查询所有数据
        return serverAllDevices(allTask)
    }else if(AllTask.statistics == '1'){ //统计多条件查询
        return serverAllDevices(allTaskCount)
    }else if(AllTask.statistics == '2'){  //统计界面excel下载
        return serverAllDevices(allTaskExcel)
    }
    
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
    serverDelateTask,
    delateTask_medium_tables,
    createTask_medium_tables
}
