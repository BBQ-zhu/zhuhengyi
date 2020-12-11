'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment:'用户id'
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        comment:'用户名'
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
        comment:'用户密码'
      },
      phone:{
        type:Sequelize.STRING,
        comment:'手机号'
      },
      hobby:{
        type:Sequelize.STRING,
        defalultValue:'无',
        comment:'爱好，收藏'
      },
      displed:{
        type:Sequelize.BOOLEAN,
        defalultValue:1,
        comment:'是否注销用户'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment:'创建时间'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment:'更新时间'
      }
    },{
      tableName:'user',
      charset:'utf8mb4',
      collate:'utf8mb4_bin',
      indexes:[{}]
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
