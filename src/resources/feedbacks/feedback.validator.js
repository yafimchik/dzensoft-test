const Joi = require('../../common/validator');
const { generateValidator } = require('../../common/utils');

const feedbackValidSchema = Joi.object({
  id: Joi.string().min(1),
  name: Joi.string().min(3).max(80).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  phoneNumber: Joi.string().phoneNumber().required(),
  title: Joi.string().min(3).max(80).required(),
  message: Joi.string().min(3).max(255).required(),
  status: Joi.boolean(),
});

const feedbackValidator = generateValidator(feedbackValidSchema);

module.exports = { feedbackValidator };
