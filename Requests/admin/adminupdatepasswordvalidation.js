const Joi = require("joi");
const { validateFailResponse } = require("../../Helpers/helper");

const schema = Joi.object({
  oldPassword: Joi.string().required().messages({
    "string.base": "Old Password should be a string.",
    "any.required": "Old Password is required.",
    "string.empty": "Old Password cannot be an empty field",
  }),
  newPassword: Joi.string().required().min(6).messages({
    "string.base": "New Password should be a string.",
    "any.required": "New Password is required.",
    "string.empty": "New Password cannot be an empty field",
    "string.min": "New Password must be at least 6 character!",
  }),
  newPasswordConfirmation: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "any.only": "New Password and newPasswordConfirmation must be same.",
    }),
});

const validatePasswordUpdate = (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return validateFailResponse(res, error);
  } else {
    next();
  }
};

module.exports = { validatePasswordUpdate };
