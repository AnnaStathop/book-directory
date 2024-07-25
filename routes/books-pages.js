const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const {
  getBookByTitle,
  createBook,
  deleteBookByTitle,
  updateBookByTitleAndAuthor,
  getBooks,
} = require("../models/books");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/books/all-books", async (req, res) => {
  const books = await getBooks();
  const bookList = books.map((book) => {
    return { title: book.title, author: book.author };
  });
  res.render("all-books", {
    title: "Book Directory - All Books",
    header: "All Books",
    bookList: bookList,
  });
});

router.post("/books/all-books", async (req, res) => {
  const { title } = req.body;
  if (title) {
    const book = await getBookByTitle(title);
    const author = book.author;
    if (book.author == undefined) {
      res.render("popup-dontExist", {
        title: "Book Directory - All Books",
      });
    } else {
      res.render("specific-book", {
        title: "Book Directory - All Books",
        Title: `${title}`,
        author: `${author}`,
      });
    }
  }
});

router.get("/books/update-book/*", async (req, res) => {
  const title = req.params[0];
  const book = await getBookByTitle(title);
  const author = book.author;
  res.render("edit-book", {
    title: "Edit Book",
    bookTitle: `${title}`,
    bookAuthor: `${author}`,
  });
});

router.post("/books/update-book/*", async (req, res) => {
  const { title, author } = req.body;
  const oldTitle = req.params[0];
  await updateBookByTitleAndAuthor(oldTitle, title, author);
  res.redirect("/books/all-books");
});

router.get("/books/add-book", (req, res) => {
  res.render("add-book", { title: "Add New Book" });
});

router.post("/books/add-book", async (req, res) => {
  const { title, author } = req.body;
  const book = await getBookByTitle(title);
  if (book && book.author === author) {
    res.render("popup-alreadyExists", { title: "Error" });
  } else {
    await createBook(title, author);
    res.redirect("/books/all-books");
  }
});

router.get("/books/delete-book", (req, res) => {
  res.render("delete-book", { title: "Delete Book" });
});

router.post("/books/delete-book", async (req, res) => {
  const { title, author } = req.body;
  await deleteBookByTitle(title, author);
  res.redirect("/books/all-books");
});

module.exports = router;
