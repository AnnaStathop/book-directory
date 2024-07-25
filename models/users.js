const pool = require("./dbconnection.js");

async function getUsers() {
  try {
    const [rows] = await pool.query("SELECT id, email, password FROM users");

    return rows ? rows : {};
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const [rows] = await pool.query(
      "SELECT id, email, password FROM users WHERE id = ?",
      [id]
    );

    return rows.length > 0 ? rows[0] : {};
  } catch (error) {
    throw error;
  }
}

async function getUserByEmailAndPassword(email, password) {
  try {
    const [rows] = await pool.query(
      "SELECT id, email, password FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length > 0) {
      return 200;
    } else {
      return 404;
    }
  } catch (error) {
    throw error;
  }
}

async function addNewUserGivenEmailAndPassword(email, password) {
  try {
    const [rows] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmailAndPassword,
  addNewUserGivenEmailAndPassword,
};
