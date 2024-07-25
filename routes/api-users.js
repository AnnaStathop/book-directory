const express = require("express");
const router = express.Router();
const {
  validateUserBody,
  validateGetUserById,
} = require("../validation/routes-users-validator");
const apiUsersContr = require("../controllers/api-users-contr");
const {
  userSchema,
  getUserByIdSchema,
} = require("../validation/routes-users-validator");

router.get("/users", apiUsersContr.sendUsers);

router.get(
  "/users/:id",
  validateGetUserById(getUserByIdSchema),
  apiUsersContr.getSpecificUser
);

router.post("/users", validateUserBody(userSchema), apiUsersContr.addNewUser);

module.exports = router;
