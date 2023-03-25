const express = require("express");
const {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
  deleteAllUsers,
} = require("../operations/UserOperations");

const router = express.Router();
 
router.route("/create").post(createUser);
router.route("/edit").put(editUser);
router.route("/delete").delete(deleteUser);
router.route("/getAll").get(getAllUsers);
router.route("/deleteAll").delete(deleteAllUsers);
 
module.exports = router;