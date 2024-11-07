const express = require("express");
const { register, login } = require("../controllers/authController");
const { sanitizeUser } = require("../middleware/sanitizer");
const { loginLimiter } = require("../middleware/rateLimiter");
const router = express.Router();

router.post("/register", sanitizeUser, register);
router.post("/login", sanitizeUser, loginLimiter, login);

module.exports = router;