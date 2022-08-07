const {
  Product,
  User,
  ProductImage,
  ProductStock,
  Promo,
} = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const XLSX = require("xlsx");
const fs = require("fs");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const page = +req.query.page || 1;
      const sorter = req.query.sorter || "name";
      const order = req.query.order || "asc";
      const limit = req.query.limit || 8;

      let products = await Product.findAll({
        include: [User, ProductImage, ProductStock, Promo],
        limit: limit,
        offset: (page - 1) * limit,
        order: [[sorter, order]],
      });

      products.forEach((product, index) => {
        products[index].finalPrice = product.price - product.price * (product.Promo.potongan_harga / 100);
      })

      let totalData = await Product.count();

      let result = {
        data: products,
        page: page,
        limit: limit,
        totalData: totalData,
        totalPage: Math.ceil(totalData / limit),
      };
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getProductsSortPrice(req, res, next) {
    try {
      const page = +req.query.page || 1;
      const sorter = "price";
      const order = "asc";
      const limit = req.query.limit || 10;

      let products = await Product.findAll({
        include: [User, ProductImage, ProductStock, Promo],
        limit: limit,
        // offset: (page - 1) * limit,
        order: [[sorter, order]],
      });

      products.forEach((product, index) => {
        products[index].finalPrice = product.price - product.price * (product.Promo.potongan_harga / 100);
      })

      let totalData = await Product.count();
      let result = {
        data: products,
        limit: limit || 5,
        // page: page,
        totalData: totalData,
        // totalPage: Math.ceil(totalData / limit),
      };
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getProductsPopular(req, res, next) {
    try {
      const page = +req.query.page || 1;
      const sorter = "totalSold";
      const order = "desc";
      const limit = req.query.limit || 10;

      let products = await Product.findAll({
        include: [User, ProductImage, ProductStock, Promo],
        limit: limit,
        // offset: (page - 1) * limit,
        order: [[sorter, order]],
        where: {
          totalSold: { [Op.gt]: 0 },
        },
      });

      products.forEach((product, index) => {
        products[index].finalPrice = product.price - product.price * (product.Promo.potongan_harga / 100);
      })
      let totalData = await Product.count();
      let result = {
        data: products,
        limit: limit || 5,
        totalData: totalData,
        // page: page,
        // totalPage: Math.ceil(totalData / limit),
      };
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getProductsBySearch(req, res, next) {
    try {
      const page = +req.query.page || 1;
      const sorter = req.query.sorter || "id";
      const order = req.query.order || "asc";
      const limit = req.query.limit || 5;
      const search = req.query.search;
      const filter = req.query.filter || [];
      let products;

      products = await Product.findAndCountAll({
        include: [User, ProductImage, ProductStock, Promo],
        limit: limit,
        offset: (page - 1) * limit,
        order: [[sorter, order]],
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              desc: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              category: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
      });

      // ----- Filter products by categories -----
      if (filter.length !== 0) {
        console.log(filter);
        console.log("ada filter");
        console.log(products.rows);
        products.rows = products.rows.filter((prd) =>
          filter.includes(prd.category)
        );
      }

      // ----- Output Data for FE -----
      products.rows.forEach((product, index) => {
        products.rows[index].finalPrice = product.price - product.price * (product.Promo.potongan_harga / 100);
      })

      let totalData = products.count;
      let result = {
        data: products.rows,
        page: page,
        limit: limit,
        totalData: totalData,
        totalPage: Math.ceil(totalData / limit),
      };

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  static async getByCategories(req, res, next) {
    try {
      const category = req.params.category || "tops";
      const page = +req.query.page || 1;
      const limit = req.query.limit || 5;
      const sorter = req.query.sorter || "id";
      const order = req.query.order || "asc";

      let products = await Product.findAll({
        include: [User, ProductImage, ProductStock, Promo],
        limit: limit,
        offset: (page - 1) * limit,
        order: [[sorter, order]],
        where: {
          category: category,
        },
      });

      let totalData = await Product.count({
        where: {
          category: category,
        },
      });

      products.forEach((product, index) => {
        products[index].finalPrice = product.price - product.price * (product.Promo.potongan_harga / 100);
      })

      let result = {
        data: products,
        page: page,
        limit: limit,
        totalData: totalData,
        totalPage: Math.ceil(totalData / limit),
      };
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  //just for admin
  static async create(req, res, next) {
    try {
      const id = req.userData.id;
      const imageSize = req.files.imageSize[0].filename;
      const imagenames = req.files.filename;
      const {
        name,
        desc,
        price,
        sizes,
        height,
        width,
        len,
        colors,
        stocks,
        weight,
        category,
        condition,
        totalSold,
        rating,
        views,
        PromoId,
      } = req.body;

      const result = await Product.create({
        name,
        desc,
        price,
        weight,
        height,
        width,
        len,
        category,
        condition,
        totalSold,
        rating,
        views,
        imageSize,
        finalPrice: price || 0,
        PromoId,
        UserId: id,
      });

      console.log(result.id);
      if (result.id) {
        console.log(sizes);
        console.log(colors);
        console.log(stocks);
        if (sizes && colors) {
          if (sizes.constructor === Array) {
            sizes.forEach(async (size, index) => {
              await ProductStock.create({
                ProductId: result.id,
                size: size || 0,
                color: colors[index] || 0,
                stock: stocks[index] || 0,
              });
            });
          } else {
            await ProductStock.create({
              ProductId: result.id,
              size: sizes || 0,
              color: colors || 0,
              stock: stocks || 0,
            });
          }
        }
      }

      let newPromo = await Promo.findByPk(PromoId);

      if (newPromo) {
        console.log("OK");
        console.log(newPromo);
        let newPrice = await Product.update(
          {
            finalPrice:
              result.price - result.price * (newPromo.potongan_harga / 100),
          },
          {
            where: {
              id: result.id,
            },
          }
        );
      }

      imagenames.forEach(async (imagename, index) => {
        const isPrimary = index === 0 ? true : false;
        await ProductImage.create({
          filename: imagename.filename,
          ProductId: result.id,
          fileType: imagename.mimetype,
          primary: isPrimary,
        });
      });
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  //just for admin
  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.userData.id;
      console.log(req.files.imageSize);
      const imagenames = req.files.filename;
      const {
        name,
        desc,
        price,
        sizes,
        colors,
        stocks,
        weight,
        height,
        width,
        len,
        category,
        PromoId,
        condition,
        totalSold,
        rating,
        views,
        oldImageSize,
      } = req.body;

      const newImageSize = oldImageSize || req.files.imageSize[0].filename;
      // const imageSize = req.files.imageSize[0].filename;

      let result = await Product.update(
        {
          name,
          desc,
          finalPrice: price,
          weight,
          height,
          width,
          len,
          category,
          imageSize: newImageSize,
          PromoId,
          condition,
          // totalSold,
          // rating,
          // views,
        },
        {
          where: { id: id, UserId: userId },
        }
      );

      console.log(id);
      console.log(sizes);
      console.log(colors);
      console.log(stocks);

      if (result) {
        console.log("result true");
        if (sizes && colors) {
          if (sizes.constructor === Array) {
            sizes.forEach(async (size, index) => {
              await ProductStock.update(
                {
                  stock: stocks[index],
                },
                {
                  where: {
                    ProductId: id,
                    size: sizes[index],
                    color: colors[index],
                  },
                }
              );
            });
          } else {
            await ProductStock.update(
              {
                stock: stocks,
              },
              {
                where: {
                  ProductId: id,
                  size: sizes,
                  color: colors,
                },
              }
            );
          }
        }
      }

      let newPromo = await Promo.findByPk(PromoId);
      let selectedProduct = await Product.findByPk(id);

      if (newPromo) {
        let newPrice = await Product.update(
          {
            finalPrice:
              selectedProduct.price -
              selectedProduct.price * (newPromo.potongan_harga / 100),
          },
          {
            where: {
              id: id,
            },
          }
        );
      }

      if (imagenames.length > 1) {
        imagenames.forEach(async (imagename, index) => {
          const isPrimary = index === 0 ? true : false;
          await ProductImage.create({
            filename: imagename.filename,
            ProductId: id,
            fileType: imagename.mimetype,
            primary: isPrimary,
          });
        });
      }

      res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  static async getProductById(req, res, next) {
    const id = req.params.id;
    try {
      let result = await Product.findByPk(id, {
        include: [ProductImage, ProductStock, Promo],
      });

      result.finalPrice = result.price - result.price * (result.Promo.potongan_harga / 100);

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async addViews(req, res, next) {
    const id = req.params.id;
    try {
      let product = await Product.findByPk(id);
      let result = await Product.update(
        {
          views: product.views + 1,
        },
        {
          where: { id },
        }
      );
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async updateImageSize(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.userData.id;
      const imageSize = req.file.filename;

      let result = await Product.update(
        {
          imageSize: imageSize,
        },
        {
          where: { id: id, UserId: userId },
        }
      );
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  static async createBulkProduct(req, res, next) {
    try {
      // console.log("test")
      const type = req.file;
      const workbook = XLSX.readFile(`assets/${type.filename}`);
      const sheets = workbook.Sheets["Sheet1"];
      const dataJson = XLSX.utils.sheet_to_json(sheets);
      console.log(dataJson);
      const userId = req.userData.id;

      dataJson.forEach(async (data, index) => {
        let result = await Product.create({
          name: data.name || "",
          desc: data.desc || "",
          price: data.price || 0,
          stock: 0,
          weight: data.weight || 0,
          category: data.category || "",
          condition: data.condition || "Need to stock",
          UserId: userId,
          finalPrice: data.price || 0,
          PromoId: data.PromoId || 1,
        });
        const sizes = data.sizes.split(",");
        const colors = data.colors.split(",");
        const stocks = data.stocks.split(",");
        const images = data.imagesName.split(",");
        sizes.forEach(async (size, index) => {
          let stock = await ProductStock.create({
            size: sizes[index],
            color: colors[index],
            stock: stocks[index],
            ProductId: result.id,
          });
        });
      });

      res.status(201).json("sukses");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ProductController;
