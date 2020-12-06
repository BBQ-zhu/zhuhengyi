const Models = require('../../models/index')

//查询所有用户
const serverAllUser= async function () {
    const allUser = await Models.users.findAll({
        attributes:['username'],
        include: [{
            model: Models.tasks   //这里小写。。。
        }]
    })
    console.log(allUser)
    return allUser
}

//查询注册用户是否已存在
const serverUser = async function (user) {
    const userName = await Models.users.findOne({
        where: {
            username: user
        },
        attributes:['username']
    })
    return userName
}

//创建新用户
const serverCreateUser = async function (user) {
    const createUser = await Models.users.create({
        username:user.username,
        password:user.password,
        phone:user.phone,
        hobby:user.hobby || '无',
        displed:1,
    })
    return createUser
}

//创建新用户
const serverDelateUser = async function (user) {
    const delateUser = await Models.users.destroy({
        where:{
            username:user
        }
    })
    return delateUser
}

module.exports = {
    serverAllUser,
    serverUser,
    serverCreateUser,
    serverDelateUser
}
