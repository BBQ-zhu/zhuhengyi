'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('upload_imgs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                comment: '图片id'
            },
            task_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tasks', //这里必须大写。也可以先引入tasks表
                    key: 'id'
                },
                comment: '关联的任务id'
            },
            img_url: {
                type: Sequelize.STRING,
                comment: '图片地址'
            },
            displed: {
                type: Sequelize.BOOLEAN,
                defalultValue: 1,
                comment: '是否注销当前图片'
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                comment: '更新时间'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                comment: '创建时间'
            }
        }, {
            tableName: 'user',
            charset: 'utf8mb4',
            collate: 'utf8mb4_bin',
            indexes: [{}]
        });

    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('upload_imgs');
    }
};
