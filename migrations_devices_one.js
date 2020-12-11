'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('devices_ones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '设备组id'
      },
      device_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '设备组名称'
      },
      displed: {
        type: Sequelize.BOOLEAN,
        defalultValue: 1,
        comment: '是否注销当前设备组'
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
    await queryInterface.dropTable('devices_ones');
  }
};
