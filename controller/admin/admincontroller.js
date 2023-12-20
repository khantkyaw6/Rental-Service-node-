const mongoose = require("mongoose");
const Admin = require("../../model/adminmodel");
const { message } = require("../../Helpers/helper");
const uploadBase64Image = require("../../fileoperation/upload_image_file");
const { ObjectId } = mongoose.Types;

const upload = async (req, res) => {
  const { name, profile } = req.body;
  const exitAdmin = await Admin.findById(new ObjectId(req.admin.id));
  if (exitAdmin) {
    if (profile) {
      const file = await uploadBase64Image(profile, "admin", "profile");
      exitAdmin.profile = file;
    }
    exitAdmin.name = name;
    await exitAdmin.save();
    return message(res, false, "Profile update successfully", exitAdmin);
  }
};
const updatePassword = async (req, res) => {
  console.log("hello world");
};

module.exports = { upload, updatePassword };
