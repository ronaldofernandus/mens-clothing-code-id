const { Promo } = require("../models");
const axios = require("axios");
const BASE_URL = "https://api.rajaongkir.com/starter";
const API_KEY = String(process.env.RAJA_ONGKIR_API_KEY);

class RajaOngkirApiController {
  static async getProvinces(req, res) {
    try {
      // Success
      console.log("test");
      let frontUrl = new URL(
        `${req.protocol}://${req.get("host")}${req.originalUrl}`
      );
      // console.log(frontUrl.search)
      let provinces = await axios({
        method: "GET",
        url: BASE_URL + "/province" + frontUrl.search,
        headers: {
          key: API_KEY,
        },
      });

      res.status(200).json(provinces.data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async getCities(req, res) {
    try {
      // Success
      console.log("test");
      let frontUrl = new URL(
        `${req.protocol}://${req.get("host")}${req.originalUrl}`
      );
      // console.log(frontUrl.search)
      let cities = await axios({
        method: "GET",
        url: BASE_URL + "/city" + frontUrl.search,
        headers: {
          key: API_KEY,
        },
      });

      res.status(200).json(cities.data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async checkShippingCost(req, res) {
    try {
      // Success
      console.log("test");
      let frontUrl = new URL(
        `${req.protocol}://${req.get("host")}${req.originalUrl}`
      );
      console.log(req.body);
      let cost = await axios({
        method: "POST",
        url: BASE_URL + "/cost",
        data: req.body,
        headers: {
          key: API_KEY,
        },
      });

      let data = {
        result: cost.data.rajaongkir.results,
        query: cost.data.rajaongkir.query,
        origin: cost.data.rajaongkir.origin_details,
        destination: cost.data.rajaongkir.destination_details,
        rawResult: cost.data,
      };

      res.status(200).json(data);
    } catch (error) {
      // console.log(error)
      res.status(500).json(error);
    }
  }
}

module.exports = RajaOngkirApiController;
