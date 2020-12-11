const Models = require('../../models/index')

//查询所有设备,没有传入参数
const serverDevices = async function () {
    const allDevices = await Models.devices_ones.findAll({
        attributes: ['id', 'device_name'],
        include: [{
            model: Models.devices_twos, //小写，不要写Taks
            attributes: ['devices_id', 'device_name', 'device_price'],
        }]
    })
    return allDevices
}

//创建和更新设备
// {
//     id: 2,
//     device_name: "xxxx",
//     devices_twos: [
//       {
//         devices_id: null,
//         device_name: "0.5米sssss",
//         device_price: 5
//       },
//       {
//         devices_id: null,
//         device_name: "1米",
//         device_price: 5
//       }
//     ]
// }
const serverCreateDevices = async function (devices) {
    for (let i in devices) {
        let arr = devices[i].devices_twos //devices_twos表中的数据
        let twos_id = 0
        if (devices[i].id) { //如果是更新数据，则存在id
            const createDevices_hasid = await Models.devices_ones.update({
                device_name: devices[i].device_name
            }, {
                where: {
                    id: devices[i].id
                }
            })
            twos_id = devices[i].id
        } else { //如果是新增数据则没有id，插入数据库后会自动生成id
            const createDevices_noid = await Models.devices_ones.create({
                device_name: devices[i].device_name
            })
            twos_id = createDevices_noid.dataValues.id //插入数据库后自动生成的id
        }
        //给devices_twos表修改数据前先删除所有当前one表中id的数据
        const delateDevicesTwo = await Models.devices_twos.destroy({
            where: {
                devices_id: twos_id
            }
        })
        //遍历two表所有的数据，并插入数据库
        let twosArr = []
        arr.forEach( (item) => {
            twosArr.push({
                devices_id: twos_id,
                device_name: item.device_name,
                device_price: item.device_price
            })
        })
        const createDevicesTwo = await Models.devices_twos.bulkCreate(twosArr)
    }
    return true

}

//删除一级设备,传入一级设备的id
const serverDelateDevices = async function (devices) {
    console.log(devices)
    if(devices.class == 1){ //如果直接删除一级表
    //先删除关联的二级表
    let delateDevicesTwo = await Models.devices_twos.destroy({
        where: {
            devices_id: devices.id
        }
    })
    //再删除一级表
    let delateDevices_ones = await Models.devices_ones.destroy({
        where: {
            id: devices.id
        }
    })
    }else{ //class为2时，直接删除二级表数据
        let delateDevices_twos = await Models.devices_twos.destroy({
            where: {
                devices_id: devices.id
            }
        })
    }
    return true
}
module.exports = {
    serverDevices,
    serverCreateDevices,
    serverDelateDevices
}
