
module.exports = (sequelize, DataTypes) => {
  let Tasks = sequelize.define('tasks')
  const Users = sequelize.define(
    'users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    },
    hobby: {
      type: DataTypes.STRING
    },
    displed: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },{
    tableName:'users'
  })
  // Users.associate = function (models) {
    Users.hasMany(Tasks, {
      foreignKey: 'user_Id'
    });
  // };
  return Users
}
    // 外键，hasMany 一对多
    // users.hasMany(User, {
    //   foreignKey: 'userId'
    // })
    // Score.belongsTo(users, {
    //   foreignKey: 'userId'
    // })
