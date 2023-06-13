const Joi = require("joi");

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(3).max(256).required(),
        password: Joi.string().min(3).max(15).required()
    });

    return schema.validate(user);
}

module.exports = validate;