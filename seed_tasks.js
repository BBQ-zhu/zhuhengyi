const md5 = require('md5')
const moment = require('moment')
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tasks', [{
      id:1,
      company_name:'某某公司1',
      active_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      active_place: '某某地点',
      active_all_price: 100,
      displed: true,
      user_id:2,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      id:2,
      company_name: '某某公司2',
      active_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      active_place: '某某地点',
      active_all_price: 100,
      displed: true,
      user_id:2,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      id:3,
      company_name: '某某公司3',
      active_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      active_place: '某某地点',
      active_all_price: 100,
      displed: true,
      user_id:2,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
      
    }
    ], {});

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
