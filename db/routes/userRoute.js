const express = require("express");
const router = express.Router();

const { register, login, checkUser } = require("../controller/userController");

// Registration route
router.post("/register", register);

// Login route
router.post("/login", login);

// User check route
router.get("/check", checkUser);

module.exports = router;
