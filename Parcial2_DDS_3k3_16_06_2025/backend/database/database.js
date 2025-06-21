// backend/database/database.js

const { Sequelize } = require('sequelize');

// Creamos una instancia de Sequelize, configurada para usar SQLite.
// 'storage' indica la ruta del archivo que contendrá la base de datos.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './tickets.sqlite', // El archivo se creará en la raíz de /backend
  
  // Opcional: Descomenta la siguiente línea si no quieres ver las consultas SQL en la consola.
  // logging: false, 
});

// Exportamos la instancia de conexión para poder usarla en otros archivos (como los modelos).
module.exports = sequelize;