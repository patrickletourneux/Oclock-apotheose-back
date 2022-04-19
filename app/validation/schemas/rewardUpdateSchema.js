const Joi = require('joi');

const rewardUpdateSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(35),
  description: Joi.string()
    .max(50),
}).required().min(1).max(2);

module.exports = rewardUpdateSchema;
