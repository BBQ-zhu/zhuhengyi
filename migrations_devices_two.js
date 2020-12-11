'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('devices_twos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '设备id'
      },
      device_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '设备名称'
      },
      device_price: {
        type: Sequelize.FLOAT,
        defalultValue: 0,
        comment: '设备价格'
      },
      devices_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Devices_ones',  //这里必须大写
          key: 'id'
        },
        comment: '关联的主设备组id'
      },
      displed: {
        type: Sequelize.BOOLEAN,
        defalultValue: 1,
        comment: '是否注销当前设备'
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
    await queryInterface.dropTable('devices_twos');
  }
};
