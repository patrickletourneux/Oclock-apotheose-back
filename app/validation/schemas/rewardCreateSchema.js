const Joi = require('joi');

const rewardCreateSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(80)
    .required(),
  description: Joi.string()
    .min(1)
    .max(150)
    .required(),
  home_id: Joi.number()
    .integer()
    .min(1)
    .required(),
});

module.exports = rewardCreateSchema;
