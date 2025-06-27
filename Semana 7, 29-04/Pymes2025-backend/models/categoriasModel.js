const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');  // Importar la instancia de Sequelize

// Definir el modelo "categorias"
const categorias = sequelize.define('categorias', {
    IdCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = categorias;
