// db.js
const { Sequelize } = require('sequelize');

// Configura la conexión con la base de datos SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false,
});

const dbConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database!");
        
        // Sincroniza los modelos con la base de datos
        await sequelize.sync({ force: false });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = { sequelize, dbConnect };
