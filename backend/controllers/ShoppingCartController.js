const {
  ShoppingCart,
  User,
  LineItem,
  Promo,
  Product,
  Order,
  ProductStock,
} = require("../models");

class ShoppingCartController {
  static async getAllShoppingCarts(req, res, next) {
    try {
      let carts = await ShoppingCart.findAll({
        include: User,
      });
      res.status(200).json(carts);
    } catch (err) {
      next(err);
    }
  }
  static async getCartByUserId(req, res, next) {
    const id = +req.userData.id;
    try {
      let getCart = await ShoppingCart.findOne({
        where: { status: "open", UserId: id },
      });
      let lineItems = await LineItem.findAll({
        // attributes: ["*"],
        include: [Product, ProductStock],
        where: { ShoppingCartId: getCart.id },
      });
      let newVar = { ...getCart.dataValues, lineItems: lineItems };
      res.status(200).json(newVar);
    } catch (err) {
      next(err);
    }
  }
  static async addToCart(req, res, next) {
    try {
      const id = +req.userData.id;
      const { qty, ProductId, ProductStockId } = req.body;
      console.log(qty, ProductId, ProductStockId);

      // cari keranjang yang open
      const shoppingCart = await ShoppingCart.findOne({
        where: { status: "open", UserId: id },
      });

      // masukkan product ke keranjang
      let result = await LineItem.create({
        ShoppingCartId: shoppingCart.id,
        ProductId,
        ProductStockId,
        qty,
        status: "cart",
      });

      let productStockToUpdate = await ProductStock.findByPk(ProductStockId);

      await ProductStock.update(
        {
          stock: productStockToUpdate.stock - qty,
        },
        {
          where: { id: ProductStockId },
        }
      );
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  static async checkout(req, res, next) {
    try {
      const id = +req.userData.id;

      const shoppingCart = await ShoppingCart.findOne({
        where: { status: "open", UserId: id },
      });

      const lineItems = await LineItem.findAll({
        include: {
          model: Product,
          include: Promo
        },
        where: { ShoppingCartId: shoppingCart.id },
      });

      let totalQty = 0;
      let subtotal = 0;
      let totalWeight = 0;
      console.log(lineItems[0].Product);
      lineItems.forEach((lineItem) => {
        totalQty = totalQty + lineItem.qty;
        subtotal = subtotal + lineItem.qty * (lineItem.Product.price - lineItem.Product.price * (lineItem.Product.Promo.potongan_harga / 100));
        totalWeight = totalWeight + lineItem.Product.weight * lineItem.qty;
        // console.log(lineItem)
      });

      let discount;
      if (totalQty > 2) {
        discount = (subtotal * 5) / 100;
      } else {
        discount = 0;
      }

      let totalDiscount = subtotal - discount;

      let totalTax = (subtotal * 10) / 100;

      let totalDue = totalDiscount + totalTax;
      console.log(totalWeight);

      let order = await Order.create({
        subtotal: subtotal,
        discount: discount,
        totalDue: totalDue,
        totalQty: totalQty,
        totalWeight: totalWeight,
        tax: totalTax,
        status: "unpaid",
        UserId: id,
      });

      let update = await LineItem.update(
        {
          status: "order",
          OrderId: order.id,
        },
        { where: { ShoppingCartId: shoppingCart.id } }
      );

      await ShoppingCart.update(
        {
          status: "close",
        },
        {
          where: { status: "open", UserId: id },
        }
      );

      await ShoppingCart.create({
        UserId: id,
        status: "open",
      });

      for (const lineItem of lineItems) {
        const product = await Product.findByPk(lineItem.ProductId);
        const productstock = await ProductStock.findByPk(
          lineItem.ProductStockId
        );
        await Product.update(
          {
            totalSold: product.totalSold + lineItem.qty,
          },
          {
            where: { id: lineItem.ProductId },
          }
        );
        await ProductStock.update(
          {
            stock: productstock.stock - lineItem.qty,
          },
          {
            where: { id: lineItem.ProductStockId },
          }
        );
      }

      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }

  static async editLineItem(req, res, next) {
    try {
      const id = +req.params.id;
      const { qty } = req.body;

      const result = await LineItem.update(
        {
          qty: Number(qty),
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

  static async deleteLineItem(req, res, next) {
    try {
      const id = +req.params.id;
      const result = await LineItem.destroy({
        where: { id },
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ShoppingCartController;
