'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      },
      phone:{
        type:Sequelize.STRING
      },
      hobby:{
        type:Sequelize.STRING
      },
      displed:{
        type:Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      tableName:'user',
      charset:'utf8mb4',
      collate:'utf8mb4_bin',
      indexes:[{}]
    });
    //外键，hasMany 一对多
    // users.hasMany(User, {
    //   foreignKey: 'userId'
    // })
    // Score.belongsTo(users, {
    //   foreignKey: 'userId'
    // })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
