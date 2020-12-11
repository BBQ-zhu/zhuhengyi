module.exports = (sequelize, DataTypes) => {
    let Devices_ones = sequelize.define('devices_ones')
    let Devices_twos = sequelize.define(
      'devices_twos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        comment: '设备id'
      },
      device_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '设备名称'
      },
      device_price: {
        type: DataTypes.FLOAT,
        defalultValue: 0,
        comment: '设备价格'
      },
      devices_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Devices_ones',  //这里必须大写
          key: 'id'
        },
        comment: '关联的主设备组id'
      },
      displed: {
        type: DataTypes.BOOLEAN,
        defalultValue:1,
        comment: '是否注销当前设备'
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
    },{
      tableName:'devices_twos'
    })
    Devices_twos.belongsTo(Devices_ones, {
        foreignKey: 'devices_id'
    })
      return Devices_twos
    }

