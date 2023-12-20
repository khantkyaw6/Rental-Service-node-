const jwt = require("jsonwebtoken");
const Admin = require("../model/adminmodel");
const { message } = require("../Helpers/helper");
const checkRole = async (req, res, next) => {
  const whileList = ["/api/admin/login", "/api/admin/register"];
  let check = whileList.includes(req.path);
  if (check) {
    next();
  } else {
    console.log(req.admin.id);
    const checkRoleAdmin = await Admin.findById(req.admin.id);
    console.log(checkRoleAdmin.role);
    if (checkRoleAdmin.role === "admin") {
      next();
    } else {
      return message(res, true, "Your not permission");
    }
  }
};
module.exports = checkRole;
