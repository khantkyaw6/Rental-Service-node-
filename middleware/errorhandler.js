const AppError = require("../utils/appError");

const Error404Handler = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server.`, 404));
};
// ErrorHandler.js
const ErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    error: true,
    status: err.status,
    message: err.message,
  });
};

module.exports = { ErrorHandler, Error404Handler };
