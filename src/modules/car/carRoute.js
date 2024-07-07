const express = require("express");
const router = express.Router();
const carController = require("../car/carController");
const authenticateToken = require("../../middleware/authentication")
const multerMiddleware = require("../../middleware/fileHandling")
// Update user information
router.post("/create", authenticateToken, multerMiddleware, carController.createCarRecord);

module.exports = router;
