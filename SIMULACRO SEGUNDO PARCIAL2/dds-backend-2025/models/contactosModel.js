const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

const contactos = sequelize.define(
  "contactos",
  {
    IdContacto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 100],
          msg: "Nombre debe tener entre 5 y 100 caracteres",
        },
      },
    },
    FechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de nacimiento es requerida",
        },
        isDate: {
          args: true,
          msg: "Debe ser una fecha válida",
        },
      },
    },
    Telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Teléfono es requerido",
        },
        is: {
          args: [/^[0-9]{7,20}$/],
          msg: "Teléfono debe ser numérico y entre 7 y 20 dígitos",
        },
      },
    },
    IdCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdCategoria es requerido",
        },
      },
    },
    ImporteContribucion: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Importe de contribución es requerido",
        },
        isDecimal: {
          args: true,
          msg: "Importe de contribución debe ser un número decimal",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: function (contacto, options) {
        if (typeof contacto.Nombre === "string") {
          contacto.Nombre = contacto.Nombre.toUpperCase().trim();
        }
      },
    },
  }
);

module.exports = contactos;
