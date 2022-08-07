"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductImage.belongsTo(models.Product);
    }
  }
  ProductImage.init(
    {
      filename: DataTypes.STRING,
      fileType: DataTypes.STRING,
      primary: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            msg: "Primary must not be empty",
          },
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Product Id must not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "ProductImage",
    }
  );
  return ProductImage;
};
