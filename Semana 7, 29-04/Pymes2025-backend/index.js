const express = require("express");
const cors = require("cors");
const app = express();

// Configuración Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // ruta al archivo anterior

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializar base de datos
require("./models/inicializarBase");

// Middleware CORS
app.use(cors({
    origin: "*", // Configura según tu dominio de frontend si es necesario
}));

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Backend inicial dds-backend!");
});

// Importar y usar rutas
const categoriasmockRouter = require("./routes/categoriasmock");
app.use(categoriasmockRouter);

const categoriasRouter = require("./routes/categorias");
app.use(categoriasRouter);

const articulosRouter = require("./routes/articulos");
app.use(articulosRouter);

const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);
const usuariosRouter = require("./routes/usuarios");
app.use(usuariosRouter);


// Levantar servidor
const port = 3000;
if (require.main === module) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
    inicializarBase().then(() => {
        app.listen(port, () => {
            console.log(`sitio escuchando en el puerto ${port}`);
        });
    });
}
module.exports = app; // para testing

