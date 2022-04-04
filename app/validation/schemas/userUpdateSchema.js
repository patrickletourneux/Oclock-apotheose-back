const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().required().email(),
  pseudonym: Joi.string().required(),
  password: Joi.string().required(),
  avatar_img: Joi.string().required(),
}).required();
