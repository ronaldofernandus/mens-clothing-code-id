"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductStock.belongsTo(models.Product);
      ProductStock.belongsToMany(models.Order, { through: models.LineItem });
      ProductStock.belongsToMany(models.ShoppingCart, {
        through: models.LineItem,
      });
    }
  }
  ProductStock.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Product Id must not be empty",
          },
        },
      },
      size: DataTypes.STRING,
      color: DataTypes.STRING,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductStock",
    }
  );
  return ProductStock;
};
