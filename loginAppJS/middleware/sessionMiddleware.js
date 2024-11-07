const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const sessionMiddleware = session({
    store: new SQLiteStore({
        db: 'sessions.sqlite',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
});

module.exports = sessionMiddleware;