const Joi = require("joi");
const { validateFailResponse } = require("../../Helpers/helper");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a string.",
    "any.required": "Name is required.",
    "string.empty": "Name cannot be an empty field",
  }),
  profile: Joi.string().allow(null),
});

const validateAdminProfileUpdate = (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return validateFailResponse(res, error);
  } else {
    next();
  }
};

module.exports = { validateAdminProfileUpdate };
