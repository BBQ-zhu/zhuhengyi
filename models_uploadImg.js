module.exports = (sequelize, DataTypes) => {
    let Tasks = sequelize.define('tasks')
    let UploadImg = sequelize.define(
        'upload_imgs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
                comment: '图片id'
            },
            task_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tasks', //这里必须大写。也可以先引入tasks表
                    key: 'id'
                },
                comment: '关联的任务id'
            },
            img_url: {
                type: DataTypes.STRING,
                comment: '图片地址'
            },
            displed: {
                type: DataTypes.BOOLEAN,
                defalultValue: 1,
                comment: '是否注销当前图片'
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
            tableName: 'upload_imgs'
        })
    UploadImg.belongsTo(Tasks, {
        foreignKey: 'task_id'
    })

    return UploadImg
}
