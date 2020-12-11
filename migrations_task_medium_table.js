'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('task_medium_tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '任务-设备中间表id'
    },
    task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Tasks', //这里必须大写
            key: 'id'
        },
        comment: '任务id'
    },
    devices_one_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '设备组one_id'
    },
    devices_two_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '设备组two_id'
    },
    devices_two_num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '设备组two总数量'
    },
    displed: {
        type: Sequelize.BOOLEAN,
        defalultValue: 1,
        comment: '是否注销当前任务'
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
    },{
      tableName:'user',
      charset:'utf8mb4',
      collate:'utf8mb4_bin',
      indexes:[{}]
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('task_medium_tables');
  }
};
