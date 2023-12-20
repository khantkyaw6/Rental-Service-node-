const Joi = require("joi");
const { validateFailResponse } = require("../../Helpers/helper");

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
            "string.base": "Email should be a string.",
            "string.email": "Please enter a valid email address.",
            "any.required": "Email is required.",
            "string.empty": "Email cannot be an empty field",
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
});

const validateAdminLogin = (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
        return validateFailResponse(res, error);
    } else {
        next();
    }
};

module.exports = { validateAdminLogin };
