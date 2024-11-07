const csrfProtection = async (req, res, next) => {
    // Verifica si `req.user` está disponible
    if (!req.user) {
        // Si no hay usuario autenticado, no es necesario verificar CSRF
        return next();  // Pasa al siguiente middleware o controlador
    }

    // Si hay usuario autenticado, entonces verifica el CSRF token
    const csrfToken = req.cookies.csrf_token;
    const userId = req.user.id;  // Esto solo debe hacerse si `req.user` está definido.

    // Verifica si el token CSRF está presente
    if (!csrfToken) {
        return res.status(403).json({ message: "CSRF token missing" });
    }

    // Recupera el usuario de la base de datos
    const user = await User.findById(userId);
    if (!user || user.csrfToken !== csrfToken) {
        return res.status(403).json({ message: "Invalid CSRF token" });
    }

    next();  // Si el token es válido, pasa al siguiente middleware o controlador
};

module.exports = csrfProtection;

