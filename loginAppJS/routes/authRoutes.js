const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { sanitizeUser } = require("../middleware/sanitizer");
const { loginLimiter } = require("../middleware/rateLimiter");
const router = express.Router();

router.post("/register", sanitizeUser, register);
router.post("/login", sanitizeUser, loginLimiter, login);
router.post("/logout", logout);


module.exports = router;