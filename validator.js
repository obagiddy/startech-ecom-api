const Joi = require("joi");

const validator = ( schema ) => (payload) => schema.validate(payload);

const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
});

const productSchema = Joi.object({
    category: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    img: Joi.string(),
    featured: Joi.string().required(),
    topSelling: Joi.string(),
});

exports.validateCategory = validator(categorySchema);
exports.validateProduct = validator(productSchema);