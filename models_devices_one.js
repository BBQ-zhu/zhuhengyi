module.exports = (sequelize, DataTypes) => {
    let Devices_twos = sequelize.define('devices_twos')
    let Devices_ones = sequelize.define(
      'devices_ones', {
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
        tableName:'devices_ones'
      })
      Devices_ones.hasMany(Devices_twos, {
        foreignKey: 'devices_id'
    })
      return Devices_ones
    }

