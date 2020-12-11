//constrol层主要是用来校验用户输入信息是否合法，同时将server层返回的数据进行格式化 规定：code:200=>成功,code:400=>错误

const {returnError,returnSuccess} = require('../control/returnValue') //统一返回格式模板
const {serverDevices,serverCreateDevices,serverDelateDevices} = require('../server/devices') //引入server层，操作数据库

//查询所有设备
const controlDevices = async function () {
    const data = await serverDevices() 
    if(data){
        let arr = data.map((item) => {
            return item.dataValues
        })
        return returnSuccess(200,'所有设备',arr)
    }else{
        return returnError(400,'查询所有设备失败',[])
    }

}

//创建新设备
const controlCreateDevices = async function (devices) {
    if (devices) {
        //user为真则调用server层
        const data = await serverCreateDevices(devices)
        if(data){
            return returnSuccess (200,'更新设备成功',data.dataValues)
        }else{
            return returnError(400,'更新设备失败',[])
        }
    } else {
        return returnError(400,'请输入设备信息',[])
    }
}

//删除一级设备
const controlDelateDevices = async function (devices) {
    if ( devices.id && devices.class ) {
        //user为真则调用server层
        const data = await serverDelateDevices(devices)
        if(data){
            return returnSuccess (200,'删除一级设备成功',data.dataValues)
        }else{
            return returnError(400,'删除一级设备失败',[])
        }
    } else {
        return returnError(400,'请输入正确的class类id和设备id',[])
    }
}
module.exports = {
    controlDevices,
    controlCreateDevices,
    controlDelateDevices
}
