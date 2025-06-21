// backend/models/ticket.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Ticket = sequelize.define('Ticket', {
  // Atributos del modelo
  idTicket: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreTarea: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El nombre de la tarea no puede estar vacío",
      },
    },
  },
  fecha: {
    type: DataTypes.DATEONLY, // Solo almacena la fecha (YYYY-MM-DD)
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "La fecha es requerida",
      },
      isDate: {
        msg: "Debe proporcionar una fecha válida",
      },
    },
  },
  prioridad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "La prioridad es requerida",
      },
      isInt: {
        msg: "La prioridad debe ser un número entero",
      },
      min: {
        args: [1],
        msg: "La prioridad debe ser como mínimo 1",
      },
      max: {
        args: [10],
        msg: "La prioridad debe ser como máximo 10",
      },
    },
  },
}, {
  // Opciones del modelo
  timestamps: false, // No se crearán los campos createdAt y updatedAt
});

module.exports = Ticket;