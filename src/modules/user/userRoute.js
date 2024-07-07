const express = require("express");
const router = express.Router();
const userController = require("../user/userController");

// Update user information
router.post("/login", userController.login);
router.post("/create", userController.create);

module.exports = router;
