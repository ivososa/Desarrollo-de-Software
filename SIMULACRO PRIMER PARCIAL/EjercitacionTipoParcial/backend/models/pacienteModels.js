const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

// Definimos el modelo Paciente
const Paciente = sequelize.define('Paciente', {
    IdPaciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NombreMascota: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Propietario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Telefono: {
        type: DataTypes.STRING // O DataTypes.INTEGER si solo son números
        // allowNull por defecto es true, lo dejamos así
    }
});

module.exports = Paciente;