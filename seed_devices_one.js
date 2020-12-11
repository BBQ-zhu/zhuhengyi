const md5 = require('md5')
const moment = require('moment')
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('devices_ones', [{
      device_name:'桁架',
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      device_name:'舞台',
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      device_name:'音响',
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      device_name:'灯光',
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      device_name:'其他',
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
    await queryInterface.bulkDelete('devices_ones', null, {});
  }
};
