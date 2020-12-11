const md5 = require('md5')
const moment = require('moment')
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('devices_twos', [{
      device_name:'0.5米',
      device_price:5,
      devices_id:1,
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },{
      device_name:'1.0米',
      device_price:10,
      devices_id:1,
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },{
      device_name:'1.5米',
      device_price:15,
      devices_id:1,
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },{
      device_name:'2.0米',
      device_price:20,
      devices_id:1,
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },{
      device_name:'2.5米',
      device_price:25,
      devices_id:1,
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },{
      device_name:'3.0米',
      device_price:30,
      devices_id:1,
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },{
      device_name:'0.4米',
      device_price:4,
      devices_id:1,
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }]);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('devices_twos', null, {});
  }
};
