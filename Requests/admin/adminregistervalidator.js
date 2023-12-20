const Joi = require("joi");
const { validateFailResponse } = require("../../Helpers/helper");

const schema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Name should be a string.",
        "string.empty": "Name cannot be an empty field",
        "any.required": "Name is required.",
    }),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
            "string.base": "Password must be string",
            "string.empty": "Password cannot be an empty field",
            "any.required": "Password is required.",
        }),
    repeat_password: Joi.ref("password"),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
            "string.base": "Email should be a string.",
            "string.email": "Please enter a valid email address.",
            "string.empty": "Password cannot be an empty field",
            "any.required": "Email is required.",
        }),
});

const validateAdminRegister = (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        return validateFailResponse(res, error);
    } else {
        next();
    }
};

module.exports = { validateAdminRegister };
