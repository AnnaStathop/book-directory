const {
  getUsers,
  getUserById,
  addNewUserGivenEmailAndPassword,
} = require("../models/users");

exports.sendUsers = async (req, res) => {
  try {
    res.send(await getUsers());
  } catch (error) {
    return res.status(500).send("Unable to get users");
  }
};

exports.getSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).send("User does not exist");
    else {
      res.send(user);
    }
  } catch (error) {
    return res.status(500).send("Unable to get user");
  }
};

exports.addNewUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      res.send(await addNewUserGivenEmailAndPassword(email, password));
    } else {
      res.status(400);
      res.send();
    }
  } catch (error) {
    return res.status(500).send("Unable to add user");
  }
};
