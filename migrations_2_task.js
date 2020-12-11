'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '任务id'
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '公司名称'
      },
      active_time: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '活动时间'
      },
      active_place: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '活动地点'
      },
      active_all_price: {
        type: Sequelize.FLOAT,
        defalultValue: 0,
        comment: '总价格'
      },
      remarks: {
        type: Sequelize.STRING,
        comment: '备注信息'
      },
      displed: {
        type: Sequelize.BOOLEAN,
        defalultValue: 1,
        comment: '是否注销当前任务'
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  //这里必须大写
          key: 'id'
        },
        comment: '关联的用户id'
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
    await queryInterface.dropTable('tasks');
  }
};
