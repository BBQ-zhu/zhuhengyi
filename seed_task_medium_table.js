const moment = require('moment')
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('task_medium_tables', [{
                task_id: 1,
                devices_one_id: 1,
                devices_two_id: 1,
                devices_two_num: 1,
                displed: 1,
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
                task_id: 1,
                devices_one_id: 1,
                devices_two_id: 2,
                devices_two_num: 2,
                displed: 1,
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
                task_id: 2,
                devices_one_id: 2,
                devices_two_id: 2,
                devices_two_num: 2,
                displed: 1,
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
                task_id: 3,
                devices_one_id: 3,
                devices_two_id: 3,
                devices_two_num: 3,
                displed: 1,
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        ]);

    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('task_medium_tables', null, {});
    }
};
