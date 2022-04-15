const Joi = require('joi');

const rewardUpdateSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100)
    .required(),
  description: Joi.string()
    .max(200),
}).required().min(1).max(2);

module.exports = rewardUpdateSchema;
