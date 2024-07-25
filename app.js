const express = require("express");
const app = express();
const env = require("dotenv");
const path = require("path");
const fs = require("fs");
const api = require("./routes/api-books.js");
const usersAPI = require("./routes/api-users.js");
const bookRoute = require("./routes/books-pages.js");
const usersRoute = require("./routes/users-pages.js");

env.config({ path: "./sample.env" });

const port = process.env.port || 3000;

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(bookRoute);
app.use(usersRoute);
app.use("/api/v1", api);
app.use("/api/v1", usersAPI);

app.get("/", (req, res) => {
  res.redirect("/users/signup");
});

module.exports = app;
