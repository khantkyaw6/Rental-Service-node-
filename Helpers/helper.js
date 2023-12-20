const AppError = require("../utils/appError");

const message = (res = null, error, message = null, result = null) => {
  if (result === null) {
    res.status(200).json({
      error: error,
      message: message,
    });
  } else {
    res.status(200).json({
      error: error,
      message: message,
      data: result,
    });
  }
};
const validateFailResponse = (res, errormessage) => {
  res.status(400).json({
    error: true,
    message: errormessage.details[0].message,
  });
};
const jwtValidationError = (error) =>
  new AppError("Invalid token,please log in again", 401);
module.exports = {
  message,
  validateFailResponse,
  jwtValidationError,
};
