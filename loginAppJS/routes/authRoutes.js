const express = require("express");
const { register, login } = require("../controllers/authController");
const { sanitizeUser } = require("../middleware/sanitizer");
const { loginLimiter } = require("../middleware/rateLimiter");
const csrfProtection = require("../middleware/csrfMiddleware");
const router = express.Router();

router.post("/register", (req, res, next) => {
    register(req, res, next);
});

router.post("/login", loginLimiter, sanitizeUser, csrfProtection, (req, res, next) => {
    login(req, res, next);
});

module.exports = router;


