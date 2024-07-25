const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
});

const getUserByIdSchema = Joi.object({
  id: Joi.number().required(),
});

function validateUserBody(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
    next();
  };
}

function validateGetUserById(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
    next();
  };
}

module.exports = {
  validateUserBody,
  validateGetUserById,
  userSchema,
  getUserByIdSchema,
};
