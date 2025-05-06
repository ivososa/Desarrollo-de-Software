const express = require('express');
const cors = require('cors');

// crear servidor
const app = express();

app.use(express.json()); // para poder leer json en el body
require("./models/inicializarBase");  // inicializar base de datos

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite a Express leer JSON

app.get('/', (req, res) => {
    res.send('¡Backend de Veterinaria Funcionando!');
});

// cargar rutas
const pacienteRouter = require('./routes/paciente'); // Importa las rutas de pacientes
app.use('/api/pacientes', pacienteRouter); // Usa las rutas de pacientes

const port = 3000; // Puerto para el backend
app.listen(port, () => {
    console.log(`Sitio escuchando en el puerto ${port}`);
});