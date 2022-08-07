const { Promo } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class PromoController {
  static async getPromo(req, res) {
    try {
      let getPromo = await Promo.findAll();

      res.status(200).json(getPromo);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getActivePromos(req, res) {
    try {
      let getPromo = await Promo.findAll({
        where: {
          tgl_mulai: {
            [Op.lte]: moment().toDate(),
          },
          tgl_akhir: {
            [Op.gte]: moment().toDate(),
          },
        },
      });

      res.status(200).json(getPromo);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getPromoById(req, res) {
    try {
      const id = req.params.id;
      let getPromo = await Promo.findByPk(id);
      res.status(200).json(getPromo);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createPromo(req, res) {
    try {
      const { nama_promo, potongan_harga, tgl_mulai, tgl_akhir } = req.body;

      let createPromo = await Promo.create({
        nama_promo,
        potongan_harga,
        tgl_mulai,
        tgl_akhir,
      });
      res.status(201).json(createPromo);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updatePromo(req, res) {
    try {
      const id = req.params.id;
      const { nama_promo, potongan_harga, tgl_mulai, tgl_akhir } = req.body;

      let updatePromo = await Promo.update(
        {
          nama_promo,
          potongan_harga,
          tgl_mulai,
          tgl_akhir,
        },

        {
          where: { id },
        }
      );
      updatePromo[0] === 1
        ? res.status(201).json({
            message: "promo updated successfully",
          })
        : res.status(403).json({
            message: "not succes",
          });
    } catch (error) {
      //   console.log(error);
      res.status(500).json(error);
    }
  }

  static async deletePromo(req, res) {
    try {
      const id = req.params.id;

      let deletePromo = await Promo.destroy({
        where: { id },
      });
      console.log(deletePromo);
      deletePromo === 1
        ? res.status(201).json({
            message: "promo deleted successfully",
          })
        : res.status(404).json({
            message: "promo not found",
          });
    } catch (error) {
      //   console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = PromoController;
