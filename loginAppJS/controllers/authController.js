const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) => {
    try {
        const { email, username, password, role } = req.body;

        // Validar que todos los campos están completos
        if (!email || !username || !password || !role) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Comprobar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear y guardar el nuevo usuario
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({ message: `Usuario registrado con éxito: ${newUser.username}` });
    } catch (error) {
        console.error("Error en el registro:", error);
        return res.status(500).json({ message: "Error en el registro de usuario." });
    }
};

const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Validar que los campos de inicio de sesión están completos
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Buscar el usuario en la base de datos
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: "Email, nombre de usuario o contraseña incorrectos." });
        }

        // Buscar el email en la base de datos
        const userEmail = await User.findOne({ where: { email } });
        if (!userEmail) {
            return res.status(400).json({ message: "Email, nombre de usuario o contraseña incorrectos." });
        }

        // Verificar si la contraseña proporcionada coincide con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Email, nombre de usuario o contraseña incorrectos." });
        }

        // Regenerar la sesión para asegurar el almacenamiento de datos de sesión
        req.session.regenerate((err) => {
            if (err) {
                console.error("Error en la regeneración de la sesión:", err);
                return res.status(500).json({ message: "Error en la sesión" });
            }

            req.session.userId = user.id;
            req.session.role = user.role;

            // Generar el token JWT para autenticar al usuario
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                message: `Inicio de sesión exitoso: ${user.username}`,
                token: token,
            });
        });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        return res.status(500).json({ message: "Error en el inicio de sesión." });
    }
};

const logout = (req, res) => {
    try {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ message: "Error durante el cierre de sesión" });
            }

            // Clear the session cookie
            res.clearCookie('connect.sid');

            return res.status(200).json({ message: "Sesión cerrada exitosamente" });
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Error durante el cierre de sesión" });
    }
};

module.exports = { register, login, logout };

