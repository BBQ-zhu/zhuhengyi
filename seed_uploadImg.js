const moment = require('moment')
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('upload_imgs', [{
      task_id:1,
      img_url:'/publice/imgs/tasks_id0.png',
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      task_id:1,
      img_url:'/publice/imgs/tasks_id1.png',
      displed: 1,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      task_id:1,
      img_url:'/publice/imgs/tasks_id2.png',
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
    await queryInterface.bulkDelete('upload_imgs', null, {});
  }
};
