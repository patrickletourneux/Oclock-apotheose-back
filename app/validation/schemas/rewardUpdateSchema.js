const Joi = require('joi');

const rewardUpdateSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100),
  description: Joi.string()
    .min(1)
    .max(200),
  home_id: Joi.number()
    .integer()
    .min(1)
    .required(),
}).required().min(2).max(3);

module.exports = rewardUpdateSchema;
