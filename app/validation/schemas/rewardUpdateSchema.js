const Joi = require('joi');

const rewardUpdateSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100),
  description: Joi.string()
    .min(1)
    .max(200),
}).required();

module.exports = rewardUpdateSchema;
