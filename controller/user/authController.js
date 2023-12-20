const catchAsync = require("../../utils/catchAsync");
const { promisify } = require("util");
const Vendor = require("../../model/vendorModel");
const { message } = require("../../Helpers/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../../utils/appError");
const signToken = (name) => {
  const time = Math.floor(Date.now() / 1000) + 60 * 1;
  return jwt.sign({ name }, process.env.JWT_SECRECT, {
    expiresIn: time,
  });
};
exports.signUp = async (req, res, next) => {
  const vendor = await Vendor.create(req.body);
  console.log(vendor);
  const token = signToken(vendor._id);
  res.status(200).json({
    error: false,
    message: "signup success",
    token,
    data: vendor,
  });
};
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const exitVendor = await Vendor.findOne({ email });
  let token = signToken(exitVendor.name);
  res.status(200).json({
    message: "login success",
    token,
  });
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(new AppError("You are not login", 401));

  console.log("hello world");
  //verification token
  jwt.verify(token, process.env.JWT_SECRECT, function (err, decoded) {
    if (err) return next(new AppError("Token not valid!", 401));
    next();
  });
};
