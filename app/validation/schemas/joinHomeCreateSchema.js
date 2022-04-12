const Joi = require('joi');

const joinHomeCreateSchema = Joi.object({
  home_id: Joi.number().positive()
    .integer()
    .min(1)
    .required(),
  home_password: Joi.number().positive()
    .integer()
    .min(1)
    .max(9999)
    .required(),
  user_id: Joi.number().positive()
    .integer()
    .min(1)
    .required(),
});

module.exports = joinHomeCreateSchema;
