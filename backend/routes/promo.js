const promoRoutes = require("express").Router();

const PromoController = require("../controllers/PromoController");
const authentication = require("../middlewares/auth");

promoRoutes.get("/", authentication, PromoController.getPromo);
promoRoutes.get("/:id", authentication, PromoController.getPromoById);
promoRoutes.get("/active", authentication, PromoController.getActivePromos);
promoRoutes.post("/", authentication, PromoController.createPromo);
promoRoutes.put("/:id", authentication, PromoController.updatePromo);
promoRoutes.delete("/:id", authentication, PromoController.deletePromo);

module.exports = promoRoutes;
