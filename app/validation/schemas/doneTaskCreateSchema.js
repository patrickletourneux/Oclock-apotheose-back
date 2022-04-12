const Joi = require('joi');

const doneTaskCreateSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(80)
    .required(),
  value: Joi.number()
    .min(1)
    .max(1000)
    .required(),
  home_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  user_id: Joi.number()
    .integer()
    .min(1)
    .required(),
});

module.exports = doneTaskCreateSchema;
