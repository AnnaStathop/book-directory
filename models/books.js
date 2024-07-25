const pool = require("./dbconnection.js");

async function getBooks() {
  try {
    const [rows] = await pool.query("SELECT id, title, author FROM books");

    return rows ? rows : {};
  } catch (error) {
    throw error;
  }
}

async function getBookByTitle(title) {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, author FROM books WHERE title = ?",
      [title]
    );

    return rows.length > 0 ? rows[0] : {};
  } catch (error) {
    throw error;
  }
}

async function getBookById(id) {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, author FROM books WHERE id = ?",
      [id]
    );

    return rows.length > 0 ? rows[0] : {};
  } catch (error) {
    throw error;
  }
}

async function createBook(title, author) {
  try {
    const [rows] = await pool.query(
      "INSERT INTO books (title, author) VALUES (?, ?)",
      [title, author]
    );
  } catch (error) {
    throw error;
  }
}

async function deleteBook(id) {
  try {
    await pool.query("DELETE FROM books WHERE id = ?", [id]);
  } catch (error) {
    throw error;
  }
}

async function deleteBookByTitle(title, author) {
  try {
    await pool.query("DELETE FROM books WHERE title = ? AND author = ?", [
      title,
      author,
    ]);
  } catch (error) {
    throw error;
  }
}

async function updateBookByTitleAndAuthor(oldTitle, title, author) {
  const book = await getBookByTitle(oldTitle);
  const id = book.id;

  try {
    await pool.query("UPDATE books SET title = ? , author = ? WHERE id = ?", [
      title,
      author,
      id,
    ]);
  } catch (error) {
    throw error;
  }
  return 200;
}

module.exports = {
  getBooks,
  getBookById,
  createBook,
  getBookByTitle,
  createBook,
  deleteBook,
  deleteBookByTitle,
  updateBookByTitleAndAuthor,
};
