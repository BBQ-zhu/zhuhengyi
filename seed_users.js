const md5 = require('md5')
const moment = require('moment')
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      username: 'John Doe',
      password: md5('123456'),
      phone: '15828109500',
      hobby: '无',
      displed: true,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      username: 'zhuhengyi',
      password: md5('123'),
      phone: '15828109500',
      hobby: '无',
      displed: true,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')

    },
    {
      username: 'liujiajia',
      password: md5('1234'),
      phone: '15828109500',
      hobby: '无',
      displed: true,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')

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
    await queryInterface.bulkDelete('users', null, {});
  }
};
