'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'userRole', {
      type: Sequelize.STRING,
      allowNull: false,
      // defaultValue: '', /
      // / default role
    });
  },




  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'userRole');
  }
};
