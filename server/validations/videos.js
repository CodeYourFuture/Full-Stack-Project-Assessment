const Joi = require("joi");

function validate(video) {
    const schema = Joi.object({
        userId: Joi.number().required(),
        url: Joi.string().min(3).max(100).required()
    });

    return schema.validate(video);
}

module.exports = validate;