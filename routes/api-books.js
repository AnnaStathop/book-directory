const express = require("express");
const router = express.Router();
const apiBooksContr = require("../controllers/api-books-contr");
const {
  validateAddBookBody,
  validateGetBookById,
  validateUpdateBook,
  validateDeleteBook,
  deleteBookSchema,
} = require("../validation/routes-books-validation");
const {
  addBookSchema,
  getBookByIdSchema,
  updateBookSchema,
} = require("../validation/routes-books-validation");

router.get("/books", apiBooksContr.sendBooks);

router.get(
  "/books/:id",
  validateGetBookById(getBookByIdSchema),
  apiBooksContr.getBookById
);

router.post(
  "/books",
  validateAddBookBody(addBookSchema),
  apiBooksContr.addNewBook
);

router.put(
  "/books/:id",
  validateUpdateBook(updateBookSchema),
  apiBooksContr.updateBook
);

router.delete(
  "/books/:id",
  validateDeleteBook(deleteBookSchema),
  apiBooksContr.deleteBookById
);

module.exports = router;
