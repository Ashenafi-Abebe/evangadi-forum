const express = require("express");
const router = express.Router();

//   authntecation middlewar
const authMiddleware = require("../controller/middellware/authMiddleware");

const { register, login, checkUser } = require("../controller/userController");

// Registration route
router.post("/register", register);

// Login route
router.post("/login", login);

// User check route
router.get("/check", authMiddleware, checkUser);

module.exports = router;
