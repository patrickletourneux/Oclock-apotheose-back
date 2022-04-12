const Joi = require('joi');

const attributedTaskCreateSchema = Joi.object({
  user_id: Joi.number()
    .integer()
    .min(1)
    .required(),
  home_task_id: Joi.number()
    .integer()
    .min(1)
    .required(),
});

module.exports = attributedTaskCreateSchema;
