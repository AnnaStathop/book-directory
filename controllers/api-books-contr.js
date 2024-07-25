const {
  getBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBookByTitleAndAuthor,
} = require("../models/books");

exports.sendBooks = async (req, res) => {
  try {
    res.send(await getBooks());
  } catch (error) {
    return res.status(500).send("Unable to get books");
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    return res.send(book);
  } catch (error) {
    return res.status(500).send("Unable to get book");
  }
};

exports.addNewBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    res.send(await createBook(title, author));
  } catch (error) {
    return res.status(500).send("Unable to add book");
  }
};

exports.deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    let book = await getBookById(id);
    if (!book) return res.status(404).send("Book does not exist");
    await deleteBook(id);
    res.send("success");
  } catch (error) {
    return res.status(500).send("Unable to delete book");
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const id = req.params.id;
    const book = await getBookById(id);
    const oldTitle = book.title;
    res.send(await updateBookByTitleAndAuthor(oldTitle, title, author));
  } catch (error) {
    return res.status(500).send("Unable to update book");
  }
};
