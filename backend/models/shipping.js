"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shipping.hasOne(models.Order);
    }
  }
  Shipping.init(
    {
      destinationCityId: DataTypes.INTEGER,
      destinationCityName: DataTypes.STRING,
      destinationProvinceId: DataTypes.INTEGER,
      destinationProvinceName: DataTypes.STRING,
      fullAddress: DataTypes.STRING,
      expeditionCode: DataTypes.STRING,
      expeditionService: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      totalWeight: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shipping",
    }
  );
  return Shipping;
};
