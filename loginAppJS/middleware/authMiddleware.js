const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
 
        if (!token) {
            return res.status(401).json({ message: "Autorización denegada, no tienes un token" });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log("El usuario es: ", req.user);
            next();
        } catch (err) {
            return res.status(400).json({ message: "El token no es válido" });
        }
    } else {
        return res.status(401).json({ message: "Autorización denegada, no se proporcionó token" });
    }
};

module.exports = verifyToken;
