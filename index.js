const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const { dbConnect } = require("./loginAppJS/config/db.Connect");
const authRoutes = require("./loginAppJS/routes/authRoutes");
const userRoutes = require("./loginAppJS/routes/userRoutes");
const sessionMiddleware = require("./loginAppJS/middleware/sessionMiddleware");

dbConnect();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);

// Configura el middleware CSRF
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Ruta para obtener el token CSRF
app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});



