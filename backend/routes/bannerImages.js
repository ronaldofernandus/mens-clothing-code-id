const bannerImagesRoute = require("express").Router();
const BannerImagesController = require("../controllers/BannerImagesController");

const upload = require("../middlewares/multer");

bannerImagesRoute.get("/", BannerImagesController.getBanners);
bannerImagesRoute.post(
  "/add",
  upload.single("filename"),
  BannerImagesController.addBanner
);
bannerImagesRoute.get("/active", BannerImagesController.getActiveBanners);
bannerImagesRoute.get("/inactive", BannerImagesController.getInactiveBanners);
bannerImagesRoute.get("/:id", BannerImagesController.getBannerDetails);
bannerImagesRoute.put(
  "/edit/:id",
  upload.single("filename"),
  BannerImagesController.editBanner
);

module.exports = bannerImagesRoute;
