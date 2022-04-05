const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().required(),
  pseudonym: Joi.string().required(),
  password: Joi.string().required(),
}).required();
