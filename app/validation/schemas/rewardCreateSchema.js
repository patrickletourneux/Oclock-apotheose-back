const Joi = require('joi');

const rewardCreateSchema = Joi.object({
  title: Joi.string()
    .max(80)
    .required(),
  description: Joi.string()
    .max(150),
  home_id: Joi.number()
    .integer()
    .min(1)
    .required(),
}).required().min(2).max(3);

module.exports = rewardCreateSchema;
