const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// Ruta para administradores

router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
    res.json({message: "Bienvenido Administrador"})
})

// Ruta para administradores y usuarios

router.get("/user", verifyToken, authorizeRole("admin", "user"), (req, res) => {
    res.json({message: "Bienvenido Usuario"})
})

module.exports = router;