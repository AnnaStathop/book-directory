const Joi = require("joi");

const addBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

const getBookByIdSchema = Joi.object({
  id: Joi.number().required(),
});

const updateBookSchema = Joi.object({
  id: Joi.number().required(),
});

const deleteBookSchema = Joi.object({
  id: Joi.number().required(),
});

function validateAddBookBody(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
    next();
  };
}

function validateGetBookById(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
    next();
  };
}

function validateUpdateBook(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
    next();
  };
}

function validateDeleteBook(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
    next();
  };
}

module.exports = {
  validateAddBookBody,
  addBookSchema,
  validateGetBookById,
  getBookByIdSchema,
  validateUpdateBook,
  updateBookSchema,
  validateDeleteBook,
  deleteBookSchema,
};
