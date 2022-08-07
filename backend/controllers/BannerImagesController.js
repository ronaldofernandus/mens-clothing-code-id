const { BannerImages } = require("../models");

class BannerItemsController {
  static async getBanners(req, res) {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 5;
      const sorter = req.query.sorter || "createdAt";
      const order = req.query.order || "desc";
      let banners = await BannerImages.findAll({
        limit: limit,
        offset: (page - 1) * limit,
        order: [[sorter, order]],
      });
      let totalData = await BannerImages.count();
      let result = {
        data: banners,
        page: page,
        limit: limit,
        totalPage: Math.ceil(totalData / limit),
      };
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  static async getBannerDetails(req, res) {
    try {
      const id = +req.params.id;
      const banner = await BannerImages.findOne({
        where: {
          id: id,
        },
      });
      res.status(200).json(banner);
    } catch (error) {
      console.log(error);
    }
  }
  static async getActiveBanners(req, res) {
    try {
      const page = +req.query.page || 1;
      const limit = 10;
      let banners = await BannerImages.findAll({
        limit: limit,
        offset: (page - 1) * limit,
        order: [["createdAt", "desc"]],
        where: { active: true },
      });
      let totalData = await BannerImages.count();
      let result = {
        data: banners,
        page: page,
        limit: limit,
        totalPage: Math.ceil(totalData / limit),
      };
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  static async getInactiveBanners(req, res) {
    try {
      const page = +req.query.page || 1;
      const limit = 10;
      let banners = await BannerImages.findAll({
        limit: limit,
        offset: (page - 1) * limit,
        order: [["createdAt", "desc"]],
        where: { active: false },
      });
      let totalData = await BannerImages.count();
      let result = {
        data: banners,
        page: page,
        limit: limit,
        totalPage: Math.ceil(totalData / limit),
      };
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  static async addBanner(req, res) {
    try {
      const { body, active } = req.body;
      const filename = req.file.filename;
      const mimetype = req.file.mimetype;
      const result = await BannerImages.create({
        filename: filename,
        fileType: mimetype,
        body: body,
        active: active,
      });
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  static async editBanner(req, res) {
    try {
      const { body, active } = req.body;
      const filename = req.file.filename;
      const mimetype = req.file.mimetype;
      const id = +req.params.id;
      const result = await BannerImages.update(
        {
          filename: filename,
          fileType: mimetype,
          body: body,
          active: active,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = BannerItemsController;
