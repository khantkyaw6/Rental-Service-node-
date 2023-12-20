const mongoose = require("mongoose");
const User = require("../../model/usermodel");
const catchAsync = require("../../utils/catchAsync");
const { message } = require("../../Helpers/helper");
const { ObjectId } = mongoose.Types;

const index = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  return message(res, false, "User lists", users);
};

const create = catchAsync(async (req, res, next) => {
  const { firstname, lastname, middlename } = req.body;
  const user = new User({
    firstname,
    lastname,
    middlename,
  });
  const saveUser = await user.save();
  return message(res, false, "User created successfully", saveUser);
});

const update = async (req, res) => {
  const { name, city } = req.body;
  const exitUser = await User.findById(new ObjectId(req.params.id));
  exitUser.name = name;
  exitUser.city = city;
  await exitUser.save();
  return message(res, false, "User update successfully", exitUser);
};
const destory = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id });
  return message(res, false, "User delete successfully");
};

module.exports = { index, create, update, destory };
