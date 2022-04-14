const Joi = require('joi');

const findHomePassword = Joi.object({
  home_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  home_password: Joi.number()
    .integer()
    .min(1)
    .max(9999),
  // .required(),
});

module.exports = findHomePassword;
