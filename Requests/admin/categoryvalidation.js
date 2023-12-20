const Joi = require("joi");
const { validateFailResponse } = require("../../Helpers/helper");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a string.",
    "any.required": "Name is required.",
    "string.empty": "Name cannot be an empty field",
  }),
  mediaLink: Joi.string().required().messages({
    "string.base": "MediaLink should be a string.",
    "any.required": "MediaLink is required.",
    "string.empty": "MediaLink cannot be an empty field",
  }),
});

const validateAdminCategory = (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return validateFailResponse(res, error);
  } else {
    next();
  }
};

module.exports = { validateAdminCategory };
