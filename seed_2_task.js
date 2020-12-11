const md5 = require('md5')
const moment = require('moment')
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tasks', [{
      company_name:'某某1',
      active_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      active_place: '地点1',
      active_all_price: 100,
      remarks:'备注信息1',
      displed: 1,
      user_id:1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      company_name:'某某2',
      active_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      active_place: '地点2',
      active_all_price: 100,
      remarks:'备注信息2',
      displed: 1,
      user_id:1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      company_name:'某某3',
      active_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      active_place: '地点3',
      active_all_price: 100,
      remarks:'备注信息3',
      displed: 1,
      user_id:2,
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
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
