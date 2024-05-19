'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ContentTypes', 'ContentTypes_name_key');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addConstraint('ContentTypes', {
      fields: ['name'],
      type: 'unique',
      name: 'ContentTypes_name_key'
    });
  }
};
