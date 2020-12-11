module.exports = (sequelize, DataTypes) => {
    let Users = sequelize.define('users')
    let Task_medium_tables = sequelize.define('task_medium_tables')
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
      remarks: {
        type: DataTypes.STRING,
        comment: '备注信息'
      },
      displed: {
        type: DataTypes.BOOLEAN,
        defalultValue:1,
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
    },{
      tableName:'tasks'
    })
    Tasks.belongsTo(Users, {
        foreignKey: 'user_id'
    })
    Tasks.hasMany(Task_medium_tables, {
      foreignKey: 'task_id'
    })
  //   Tasks.belongsTo(Task_medium_tables, {
  //     foreignKey: 'user_id'
  // })
      return Tasks
    }

