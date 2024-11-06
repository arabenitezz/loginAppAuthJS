const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");


const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Verifica que todos los campos estén completos
        if (!username || !password || !role) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Verifica si el usuario ya existe
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
        }

        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea y guarda el nuevo usuario
        const newUser = await User.create({
            username,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ message: `Usuario registrado con éxito: ${newUser.username}` });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: "Error en el registro de usuario." });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verifica que todos los campos estén completos
        if (!username || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Busca el usuario en la base de datos
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: "Nombre de usuario o contraseña incorrectos." });
        }

        // Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Nombre de usuario o contraseña incorrectos." });
        }

        // Token
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        // Envía la respuesta con el token
        res.status(200).json({ 
            message: `Inicio de sesión exitoso: ${user.username}`, 
            token: token 
        });

    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ message: "Error en el inicio de sesión." });
    }
};

module.exports = { register, login };