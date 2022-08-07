'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shippings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      destinationCityId: {
        type: Sequelize.INTEGER
      },
      destinationCityName: {
        type: Sequelize.STRING
      },
      destinationProvinceId: {
        type: Sequelize.INTEGER
      },
      destinationProvinceName: {
        type: Sequelize.STRING
      },
      fullAddress: {
        type: Sequelize.STRING
      },
      expeditionCode: {
        type: Sequelize.STRING
      },
      expeditionService: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      totalWeight: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shippings');
  }
};