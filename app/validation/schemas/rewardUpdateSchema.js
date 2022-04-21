const Joi = require('joi');

const rewardUpdateSchema = Joi.object({
  title: Joi.string()
    .max(80),
  description: Joi.string()
    .max(150),
}).required().min(1).max(2);

module.exports = rewardUpdateSchema;
