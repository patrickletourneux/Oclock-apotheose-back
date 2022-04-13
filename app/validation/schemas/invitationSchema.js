const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().required().email(),
  home_id: Joi.string().required(),
}).required();

// for array of email, how to sen an array in req.body ?? need research
// Joi.array().items(Joi.string())
// array_email: Joi.array().items(Joi.string().required().email()),
