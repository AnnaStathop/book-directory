const express = require("express");
const router = express.Router();
const {
  getUserByEmailAndPassword,
  addNewUserGivenEmailAndPassword,
} = require("../models/users");

router.get("/users/signup", (req, res) => {
  res.render("signup-page", { title: "Signup" });
});

router.post("/users/signup", async (req, res) => {
  const { email, password } = req.body;
  if ((await getUserByEmailAndPassword(email, password)) == 200) {
    res.render("popup-userAlreadyExists", { title: "Login" });
  } else {
    await addNewUserGivenEmailAndPassword(email, password);
    res.redirect("/users/login");
  }
});

router.get("/users/login", (req, res) => {
  res.render("login-page", { title: "Login" });
});

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  if ((await getUserByEmailAndPassword(email, password)) == 200) {
    res.redirect("/books/all-books");
  } else {
    res.render("popup-wrongCred", { title: "Login" });
  }
});

module.exports = router;
