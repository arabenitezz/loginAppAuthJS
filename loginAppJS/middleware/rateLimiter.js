const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // limite de 5 intentos
    message: 'Demasiados intentos de inicio de sesión, por favor intente de nuevo después de 15 minutos',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { loginLimiter };