const Brand = require("../../model/brandmodel");
const uploadBase64Image = require("../../fileoperation/upload_image_file");
const { message } = require("../../Helpers/helper");
const { ObjectId } = require("mongodb");
const APIFeatures = require("../../utils/apiFeatures");

const brandindex = async (req, res, next) => {
  // const features = new APIFeatures(Brand.find(), req.query).filter().sort();
  // const brands = await features.query;

  // const brands = await Brand.aggregate([
  //   {
  //     $match: {
  //       status: 1,
  //     },
  //   },
  //   {
  //     lookup: {
  //       from: "categories",
  //       localField: "categoryId",
  //       foreignField: "_id",
  //       as: "category",
  //     },
  //   },
  //   {
  //     $unwind: "$category",
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       name: 1,
  //       mediaLink: 1,
  //       category: {
  //         //$arrayElemAt: ["$category.name", 0],
  //         _id: 1,
  //         name: 1,
  //         mediaLink: 1,
  //       },
  //     },
  //   },
  // ]);
  const brands = await Brand.find({});
  return message(res, false, "Brand Lists", brands);
};
const brandStore = async (req, res) => {
  const { name, categoryId, mediaLink } = req.body;
  let file = "";
  if (mediaLink) {
    file = await uploadBase64Image(mediaLink, "admin", "brand");
  }
  const brand = new Brand({
    name,
    categoryId,
    mediaLink: file,
  });
  const saveBrand = await brand.save();
  return message(res, false, "Brand created successfully", saveBrand);
};
module.exports = { brandindex, brandStore };
