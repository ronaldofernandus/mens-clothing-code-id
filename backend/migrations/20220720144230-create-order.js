"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subtotal: {
        type: Sequelize.INTEGER,
      },
      discount: {
        type: Sequelize.INTEGER,
      },
      tax: {
        type: Sequelize.INTEGER,
      },
      totalDue: {
        type: Sequelize.INTEGER,
      },
      totalQty: {
        type: Sequelize.INTEGER,
      },
      totalWeight: {
        type: Sequelize.INTEGER,
      },
      ShippingId: {
        type: Sequelize.INTEGER,
      },
      paymentTrasaction: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
