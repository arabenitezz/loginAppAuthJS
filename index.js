const express = require("express");
const helmet = require('helmet');
const dotenv = require("dotenv").config();
const { dbConnect } = require("./loginAppJS/config/db.Connect");
const authRoutes = require("./loginAppJS/routes/authRoutes");
const userRoutes = require("./loginAppJS/routes/userRoutes");
const sessionMiddleware = require("./loginAppJS/middleware/sessionMiddleware");
const csrfProtection = require("./loginAppJS/middleware/csrfMiddleware");
const cookieParser = require('cookie-parser');

dbConnect();

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(sessionMiddleware);

// Configuración de cookies
app.use(cookieParser());

// Protección CSRF
app.use(csrfProtection);

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
