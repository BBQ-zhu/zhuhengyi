//constrol层主要是用来校验用户输入信息是否合法，同时将server层返回的数据进行格式化 规定：code:200=>成功,code:400=>错误

const {returnError,returnSuccess} = require('../control/returnValue') //统一返回格式模板
const {serverAllUser,serverUser,serverCreateUser,serverDelateUser} = require('../server/user') //引入server层，操作数据库

//查询所有用户
const controlAllUser = async function () {
    const data = await serverAllUser() //user为真则调用server层
    if(data){
        let arr = data.map((item) => {
            return item.dataValues
        })
        return returnSuccess(200,'所有用户的名称',arr)
    }else{
        return returnError(400,'查询所有用户失败',[])
    }

}


//查询注册用户是否存在
const controlUser = async function (user) {
    if (user.username) {
        
        const data = await serverUser(user.username) 
        if(data){
            return returnError(400,'用户名已存在',data.dataValues)
        }else{
            return returnSuccess(200,'用户名不存在，可以注册',[])
        }
    } else {
        return returnError(400,'用户名格式错误',[])
    }
}


//创建新用户
const controlCreateUser = async function (user) {
    if (user.username && user.password && user.phone) {
        //user为真则调用server层
        const data = await serverCreateUser(user)
        if(data){
            return returnSuccess (200,'新增用户成功',data.dataValues)
        }else{
            return returnError(400,'新增用户失败',[])
        }
    } else {
        return returnError(400,'请输入姓名、密码、手机号',[])
    }
}

//删除用户
const controlDelateUser = async function (user) {
    if (user.username) {
        //user为真则调用server层
        const data = await serverDelateUser(user.username)
        if(data){
            return returnSuccess (200,'删除用户成功',data.dataValues)
        }else{
            return returnError(400,'删除用户失败',[])
        }
    } else {
        return returnError(400,'输入有误',[])
    }
}

module.exports = {
    controlAllUser,
    controlUser,
    controlCreateUser,
    controlDelateUser
    
} 
