const express = require("express");
const dotenv = require("dotenv").config();
const { dbConnect } = require("./loginAppJS/config/db.Connect");
const authRoutes = require("./loginAppJS/routes/authRoutes");

dbConnect();


const app = express();

// Middleware

app.use(express.json());

// Rutas

app.use("/api/auth", authRoutes);

// Servidor

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
})