const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string(),
  user_id: Joi.number().required(),
}).required();
