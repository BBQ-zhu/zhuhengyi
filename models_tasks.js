const Models = require('./index')
module.exports = (sequelize, DataTypes) => {
    let Users = sequelize.define('users')
    let Tasks = sequelize.define(
      'tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        comment:'任务id'
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment:'公司名称'
      },
      active_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment:'活动时间'
      },
      active_place: {
        type: DataTypes.STRING,
        allowNull: false,
        comment:'活动地点'
      },
      active_all_price: {
        type: DataTypes.FLOAT,
        defalultValue:0,
        comment:'总价格'
      },
      displed: {
        type: DataTypes.BOOLEAN,
        comment:'是否注销当前任务'
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'Users',
            key:'id'
        },
        comment:'关联的用户id'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        comment:'更新时间'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        comment:'创建时间'
      }
    },{})
    // Tasks.associate = function (models) {
    Tasks.belongsTo(Users, {
        foreignKey: 'user_id'
    })
    // }

    // Tasks.associate = function (models) {
    //     Tasks.belongsTo(models.Users, {
    //       foreignKey: 'user_id'
    //     })
    //   };
      return Tasks
    }
      
      // 外键，hasMany 一对多

