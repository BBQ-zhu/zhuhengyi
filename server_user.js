const { users } = require('../../models/index')

//查询所有用户
const serverAllUser= async function () {
    const allUser = await users.findAll({
        attributes:['username']
    })
    return allUser
}

//查询注册用户是否已存在
const serverUser = async function (user) {
    const userName = await users.findOne({
        where: {
            username: user
        },
        attributes:['username']
    })
    console.log(userName,"server层")
    return userName
}

//创建新用户
const serverCreateUser = async function (user) {
    const createUser = await users.create({
        username:user.username,
        password:user.password,
        phone:user.phone,
        hobby:user.hobby || '无',
        displed:1,
    })
    return createUser
}
module.exports = {
    serverAllUser,
    serverUser,
    serverCreateUser
}
