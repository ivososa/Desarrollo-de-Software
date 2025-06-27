// app.js
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/db');
const pilotosRouter = require('./routes/pilotos');
const loggerMiddleware = require('./middleware/logger');
const cleanerMiddleware = require('./middleware/cleaner');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de middlewares (El orden es crucial)
app.use(loggerMiddleware); // Logger debe ir primero
app.use(cors()); // Habilitar CORS para peticiones cross-origin
app.use(express.json()); // Parseo de datos JSON
app.use(express.urlencoded({ extended: true })); // Parseo de datos URL-encoded
app.use(cleanerMiddleware); // Middleware de limpieza de datos

// Configuración de archivos estáticos
app.use(express.static('public')); // Servir contenido estático desde 'public'

// Configuración de rutas de la API
app.use('/api/pilotos', pilotosRouter); // Endpoints de pilotos

// Middleware de manejo de errores (Debe ir al final)
app.use(errorHandlerMiddleware);

// Establecer conexión con la base de datos e iniciar servidor
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
            console.log(`Interfaz frontend accesible en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error al conectar con la base de datos. Cerrando aplicación...", err);
        process.exit(1);
    });