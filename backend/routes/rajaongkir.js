const rajaongkirRoutes = require("express").Router();

const RajaOngkirApiController = require("../controllers/RajaOngkirApiController");
const authentication = require("../middlewares/auth");
rajaongkirRoutes.get(
  "/getCities",
  authentication,
  RajaOngkirApiController.getCities
);
rajaongkirRoutes.get(
  "/getProvinces",
  authentication,
  RajaOngkirApiController.getProvinces
);
rajaongkirRoutes.post(
  "/checkCost",
  authentication,
  RajaOngkirApiController.checkShippingCost
);

module.exports = rajaongkirRoutes;
