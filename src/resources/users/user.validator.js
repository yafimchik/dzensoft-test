const Joi = require('../../common/validator');
const { generateValidator } = require('../../common/utils');

const userValidSchema = Joi.object({
  id: Joi.string().min(1),
  username: Joi.string().min(3).max(80).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(5).max(255).required(),
});

const userValidator = generateValidator(userValidSchema);

module.exports = { userValidator };
