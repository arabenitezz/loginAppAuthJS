// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.Connect');

const User = sequelize.define('User', {

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
    },
    
}, {
    timestamps: true, // agrega automáticamente createdAt y updatedAt
});

module.exports = User;
