
module.exports = (sequelize, DataTypes) => {
  let Tasks = sequelize.define('tasks')
  const Users = sequelize.define(
    'users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        comment:'用户id'
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment:'用户名'
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
        comment:'用户密码'
      },
      phone:{
        type:DataTypes.STRING,
        comment:'手机号'
      },
      hobby:{
        type:DataTypes.STRING,
        defalultValue:'无',
        comment:'爱好，收藏'
      },
      displed:{
        type:DataTypes.BOOLEAN,
        defalultValue:1,
        comment:'是否注销用户'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        comment:'创建时间'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        comment:'更新时间'
      }
    },{
    tableName:'users'
  })
  // Users.associate = function (models) {
    Users.hasMany(Tasks, {
      foreignKey: 'user_id'
    });
  // };
  return Users
}
    // 外键，hasMany 一对多
    // users.hasMany(User, {
    //   foreignKey: 'userId'
    // })
    // Score.belongsTo(users, {
    //   foreignKey: 'userId'
    // })
