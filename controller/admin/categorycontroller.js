const { message } = require("../../Helpers/helper");
const uploadBase64Image = require("../../fileoperation/upload_image_file");
const Category = require("../../model/categorymodel");

const categoryIndex = async (req, res) => {
  const categories = await Category.find({});
  return message(res, false, "Brand Lists", categories);
};
const categoryStore = async (req, res) => {
  const { name, mediaLink } = req.body;
  let file = "";
  if (mediaLink) {
    file = await uploadBase64Image(mediaLink, "admin", "category");
  }
  const category = new Category({
    name,
    mediaLink: file,
  });
  const saveCategory = await category.save();
  return message(res, false, "Category created successfully", saveCategory);
};
module.exports = { categoryIndex, categoryStore };
