const Joi = require('joi');

module.exports = Joi.object({
  user_id: Joi.number().required(),
  home_password: Joi.string().required(),
}).required(2);
