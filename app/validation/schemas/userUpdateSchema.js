const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email(),
  pseudonym: Joi.string(),
  password: Joi.string(),
  avatar_img: Joi.string(),
}).required().min(1).max(4);
