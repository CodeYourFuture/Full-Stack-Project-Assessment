const Joi = require("joi");

function validate(video) {
    const schema = Joi.object({
        userId: Joi.number().required(),
        url: Joi.string().min(3).max(100).required()
            .custom((value, helpers) => {
                if (value.includes('https://www.youtube.com/watch?v=') && !value.includes('&')) {
                    return value;
                }
                
                return helpers.error('any.invalid');
            }, 'Custom validation')
    });

    return schema.validate(video);
}

module.exports = validate;