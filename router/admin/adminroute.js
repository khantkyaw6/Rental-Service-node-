const express = require("express");
const router = express();
const {
  register,
  login,
  logout,
} = require("../../controller/admin/authcontroller");
const {
  validateAdminRegister,
} = require("../../Requests/admin/adminregistervalidator");
const {
  validateAdminLogin,
} = require("../../Requests/admin/adminloginvalidation");
const {
  upload,
  updatePassword,
} = require("../../controller/admin/admincontroller");
const {
  validateAdminProfileUpdate,
} = require("../../Requests/admin/adminprofileupdatevalidation");
const {
  validatePasswordUpdate,
} = require("../../Requests/admin/adminupdatepasswordvalidation");
const {
  validateAdminCategory,
} = require("../../Requests/admin/categoryvalidation");
const {
  store,
  categoryStore,
  categoryIndex,
} = require("../../controller/admin/categorycontroller");
const {
  validateAdminBrand,
} = require("../../Requests/admin/adminbrandvalidation");
const {
  brandStore,
  brandindex,
} = require("../../controller/admin/brandcontroller");
const {
  storeCity,
  indexCity,
} = require("../../controller/admin/citycontroller");
const usercontroller = require("../../controller/user/usercontroller");
const imagecontroller = require("../../controller/admin/imagecontroller");
const multerUpload = require("../../fileoperation/multer_single_file");
const authVendorController = require("../../controller/user/authController");
const checkRole = require("../../middleware/checkRole");
const basePath = "/admin";

router.param("id", (req, res, next, val) => {
  console.log(`Brand id is ${val}`);
  next();
});
//auth
router.post(`${basePath}/register`, validateAdminRegister, register);
router.post(`${basePath}/login`, validateAdminLogin, login);
router.post(`${basePath}/logout`, logout);
//end

//profile
router.post(`${basePath}/profile/update`, validateAdminProfileUpdate, upload);
router.post(
  `${basePath}/password/update`,
  validatePasswordUpdate,
  updatePassword
);
//end

//category
router.get(`${basePath}/category`, validateAdminCategory, categoryIndex);
router.post(
  `${basePath}/category`,
  validateAdminCategory,
  checkRole,
  categoryStore
);
//end
//brand
router.get(`${basePath}/brand`, brandindex);
router.post(`${basePath}/brand`, validateAdminBrand, checkRole, brandStore);
//router.post(`${basePath}/brand`, brandStore);

//end

//testing city
router.get(`${basePath}/city`, indexCity);
router.post(`${basePath}/city`, storeCity);
//end

//user
router.get(
  `${basePath}/user`,
  authVendorController.protect,
  usercontroller.index
);
router.post(`${basePath}/user`, usercontroller.create);
//end

//testing multer image
router.post(
  `${basePath}/file-upload`,
  multerUpload.single("image"),
  imagecontroller.postFileUpload
);
//end

//vendor
router.post("/vendor/signup", authVendorController.signUp);
router.post("/vendor/signin", authVendorController.signIn);

//end

exports.default = (app) => {
  app.use("/api", router);
};
