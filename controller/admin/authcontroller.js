const Admin = require("../../model/adminmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { message } = require("../../Helpers/helper");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const permissions = [
    "brand.menu",
    "brand.list",
    "category.menu",
    "category.list",
  ];
  //check email unique
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) return message(res, true, "Email already exists");
  //end
  const auth_token = jwt.sign({ email }, "admin", {
    expiresIn: "1w",
  });
  const hashPsw = bcrypt.hashSync(password, 10);
  const admin = new Admin({
    name,
    email,
    password: hashPsw,
    role: "admin",
    permissions,
    authToken: auth_token,
  });
  const saveAdmin = await admin.save();

  return message(res, false, "Admin registerd successfully", saveAdmin);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const auth_token = jwt.sign({ email }, "admin", {
    expiresIn: "1w",
  });
  const admin = await Admin.findOne({ email });
  if (!admin) return message(res, true, "Incorrect Email!");

  if (admin && bcrypt.compareSync(password, admin.password)) {
    const updateTokenAdmin = await Admin.findOneAndUpdate(
      { _id: admin.id },
      { authToken: auth_token },
      {
        returnOriginal: false,
      }
    );
    const result = {
      _id: updateTokenAdmin._id,
      name: updateTokenAdmin.name,
      email: updateTokenAdmin.email,
      password: updateTokenAdmin.password,
      role: updateTokenAdmin.role,
      permissions: updateTokenAdmin.permissions,
      profile: updateTokenAdmin.profile,
      token: updateTokenAdmin.authToken,
    };
    return message(res, false, "Admin Login Successfully", result);
  } else {
    return message(res, true, "Incorrect Password!");
  }
};

const logout = async (req, res) => {
  console.log(req.admin.id);
  //return;
  await Admin.findOneAndUpdate(
    { _id: req.admin.id },
    { authToken: null },
    {
      returnOriginal: false,
    }
  );
  return message(res, false, "Admin logout successfully");
};

module.exports = { register, login, logout };
