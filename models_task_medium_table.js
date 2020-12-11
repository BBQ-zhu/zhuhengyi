module.exports = (sequelize, DataTypes) => {
    let Tasks = sequelize.define('tasks')
    let Devices_ones = sequelize.define('devices_ones')
    let Devices_twos = sequelize.define('devices_twos')
    const Task_medium_tables = sequelize.define(
        'task_medium_tables', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
                comment: '任务-设备中间表id'
            },
            task_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tasks', //这里必须大写
                    key: 'id'
                },
                comment: '任务id'
            },
            devices_one_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '设备组one_id'
            },
            devices_two_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '设备组two_id'
            },
            devices_two_num: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '设备组two总数量'
            },
            displed: {
                type: DataTypes.BOOLEAN,
                defalultValue: 1,
                comment: '是否注销当前任务'
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                comment: '更新时间'
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                comment: '创建时间'
            }
        }, {
            tableName: 'task_medium_tables'
        })

    Task_medium_tables.belongsTo(Tasks, {
        foreignKey: 'task_id'
    })


    return Task_medium_tables
}
