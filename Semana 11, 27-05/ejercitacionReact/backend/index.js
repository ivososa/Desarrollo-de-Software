const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');

// Configuración inicial
const aplicacion = express();
const puerto = 3000;

// Configuración de middlewares
aplicacion.use(cors());
aplicacion.use(express.json());

// Configuración de la base de datos
const baseDatos = new Sequelize({
    dialect: 'sqlite',
    storage: './libros.sqlite',
    logging: false // Desactivar logs de SQL para más limpieza
});

// Modelo de Libro con validaciones adicionales
const Libro = baseDatos.define('Libro', {
    IdLibro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255]
        }
    },
    Autor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 150]
        }
    },
    AnioPublicacion: {
        type: DataTypes.INTEGER,
        validate: {
            min: -3000, // Para libros muy antiguos
            max: new Date().getFullYear() + 1 // Hasta el próximo año
        }
    }
}, {
    timestamps: true, // Incluir createdAt y updatedAt
    tableName: 'Libros'
});

// Datos de ejemplo con diferentes libros
const datosIniciales = [
    { Titulo: 'La sombra del viento', Autor: 'Carlos Ruiz Zafón', AnioPublicacion: 2001 },
    { Titulo: 'Ficciones', Autor: 'Jorge Luis Borges', AnioPublicacion: 1944 },
    { Titulo: 'El túnel', Autor: 'Ernesto Sabato', AnioPublicacion: 1948 },
    { Titulo: 'La casa de los espíritus', Autor: 'Isabel Allende', AnioPublicacion: 1982 },
    { Titulo: 'Crónica de una muerte anunciada', Autor: 'Gabriel García Márquez', AnioPublicacion: 1981 },
    { Titulo: 'El perfume', Autor: 'Patrick Süskind', AnioPublicacion: 1985 },
    { Titulo: 'La metamorfosis', Autor: 'Franz Kafka', AnioPublicacion: 1915 },
    { Titulo: 'Cinco horas con Mario', Autor: 'Miguel Delibes', AnioPublicacion: 1966 },
    { Titulo: 'El coronel no tiene quien le escriba', Autor: 'Gabriel García Márquez', AnioPublicacion: 1961 },
    { Titulo: 'Bodas de sangre', Autor: 'Federico García Lorca', AnioPublicacion: 1933 },
    { Titulo: 'La regenta', Autor: 'Leopoldo Alas Clarín', AnioPublicacion: 1884 },
    { Titulo: 'Fortunata y Jacinta', Autor: 'Benito Pérez Galdós', AnioPublicacion: 1887 },
    { Titulo: 'El lazarillo de Tormes', Autor: 'Anónimo', AnioPublicacion: 1554 },
    { Titulo: 'La Celestina', Autor: 'Fernando de Rojas', AnioPublicacion: 1499 },
    { Titulo: 'Niebla', Autor: 'Miguel de Unamuno', AnioPublicacion: 1914 },
    { Titulo: 'Poeta en Nueva York', Autor: 'Federico García Lorca', AnioPublicacion: 1940 },
    { Titulo: 'Campos de Castilla', Autor: 'Antonio Machado', AnioPublicacion: 1912 },
    { Titulo: 'Platero y yo', Autor: 'Juan Ramón Jiménez', AnioPublicacion: 1914 },
    { Titulo: 'La familia de Pascual Duarte', Autor: 'Camilo José Cela', AnioPublicacion: 1942 },
    { Titulo: 'Tiempo de silencio', Autor: 'Luis Martín-Santos', AnioPublicacion: 1962 },
    { Titulo: 'San Manuel Bueno, mártir', Autor: 'Miguel de Unamuno', AnioPublicacion: 1931 },
    { Titulo: 'La tía Tula', Autor: 'Miguel de Unamuno', AnioPublicacion: 1921 },
    { Titulo: 'Abel Sánchez', Autor: 'Miguel de Unamuno', AnioPublicacion: 1917 },
    { Titulo: 'Doña Perfecta', Autor: 'Benito Pérez Galdós', AnioPublicacion: 1876 },
    { Titulo: 'Marianela', Autor: 'Benito Pérez Galdós', AnioPublicacion: 1878 },
    { Titulo: 'Episodios Nacionales', Autor: 'Benito Pérez Galdós', AnioPublicacion: 1873 },
    { Titulo: 'La casa de Bernarda Alba', Autor: 'Federico García Lorca', AnioPublicacion: 1936 },
    { Titulo: 'Yerma', Autor: 'Federico García Lorca', AnioPublicacion: 1934 },
    { Titulo: 'Romancero gitano', Autor: 'Federico García Lorca', AnioPublicacion: 1928 },
    { Titulo: 'Soledades', Autor: 'Antonio Machado', AnioPublicacion: 1903 },
    { Titulo: 'Nuevas canciones', Autor: 'Antonio Machado', AnioPublicacion: 1924 },
    { Titulo: 'Diario de un poeta recién casado', Autor: 'Juan Ramón Jiménez', AnioPublicacion: 1916 },
    { Titulo: 'Espacio', Autor: 'Juan Ramón Jiménez', AnioPublicacion: 1954 },
    { Titulo: 'Animal de fondo', Autor: 'Juan Ramón Jiménez', AnioPublicacion: 1949 },
    { Titulo: 'La colmena', Autor: 'Camilo José Cela', AnioPublicacion: 1951 },
    { Titulo: 'Mrs. Caldwell habla con su hijo', Autor: 'Camilo José Cela', AnioPublicacion: 1953 },
    { Titulo: 'Cinco horas con Mario', Autor: 'Miguel Delibes', AnioPublicacion: 1966 },
    { Titulo: 'Los santos inocentes', Autor: 'Miguel Delibes', AnioPublicacion: 1981 },
    { Titulo: 'El camino', Autor: 'Miguel Delibes', AnioPublicacion: 1950 },
    { Titulo: 'Las ratas', Autor: 'Miguel Delibes', AnioPublicacion: 1962 }
];

// Función para inicializar la base de datos
async function inicializarDatos() {
    try {
        const totalLibros = await Libro.count();
        if (totalLibros === 0) {
            console.log('🔄 Insertando datos iniciales en la base de datos...');
            await Libro.bulkCreate(datosIniciales);
            console.log(`✅ Se insertaron ${datosIniciales.length} libros correctamente.`);
        } else {
            console.log(`📚 La base de datos ya contiene ${totalLibros} libros.`);
        }
    } catch (error) {
        console.error('❌ Error al inicializar datos:', error.message);
        throw error;
    }
}

// Ruta principal
aplicacion.get('/', (peticion, respuesta) => {
    respuesta.json({
        mensaje: '📚 API de Gestión de Libros - Funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            libros: '/api/libros',
            buscar: '/api/libros?search=termino',
            detalle: '/api/libros/:id'
        }
    });
});

// Obtener todos los libros con búsqueda opcional
aplicacion.get('/api/libros', async (peticion, respuesta) => {
    try {
        const terminoBusqueda = peticion.query.search;
        let condicionBusqueda = {};

        if (terminoBusqueda && terminoBusqueda.trim() !== '') {
            condicionBusqueda = {
                [Op.or]: [
                    { Titulo: { [Op.like]: `%${terminoBusqueda}%` } },
                    { Autor: { [Op.like]: `%${terminoBusqueda}%` } }
                ]
            };
        }

        const librosEncontrados = await Libro.findAll({
            where: condicionBusqueda,
            order: [['Titulo', 'ASC']]
        });

        respuesta.json({
            exito: true,
            total: librosEncontrados.length,
            datos: librosEncontrados
        });

    } catch (error) {
        console.error('❌ Error en GET /api/libros:', error);
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al obtener los libros',
            error: error.message
        });
    }
});

// Obtener un libro específico por ID
aplicacion.get('/api/libros/:id', async (peticion, respuesta) => {
    try {
        const idLibro = parseInt(peticion.params.id);
        
        if (isNaN(idLibro)) {
            return respuesta.status(400).json({
                exito: false,
                mensaje: 'ID de libro inválido'
            });
        }

        const libroEncontrado = await Libro.findByPk(idLibro);
        
        if (!libroEncontrado) {
            return respuesta.status(404).json({
                exito: false,
                mensaje: `No se encontró el libro con ID ${idLibro}`
            });
        }

        respuesta.json({
            exito: true,
            datos: libroEncontrado
        });

    } catch (error) {
        console.error(`❌ Error en GET /api/libros/${peticion.params.id}:`, error);
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al obtener el libro',
            error: error.message
        });
    }
});

// Crear un nuevo libro
aplicacion.post('/api/libros', async (peticion, respuesta) => {
    try {
        const datosLibro = peticion.body;
        
        // Validación básica
        if (!datosLibro.Titulo || !datosLibro.Autor) {
            return respuesta.status(400).json({
                exito: false,
                mensaje: 'Título y Autor son campos obligatorios'
            });
        }

        const nuevoLibro = await Libro.create(datosLibro);
        
        respuesta.status(201).json({
            exito: true,
            mensaje: 'Libro creado exitosamente',
            datos: nuevoLibro
        });

    } catch (error) {
        console.error('❌ Error en POST /api/libros:', error);
        
        if (error.name === 'SequelizeValidationError') {
            return respuesta.status(400).json({
                exito: false,
                mensaje: 'Datos de validación incorrectos',
                errores: error.errors.map(e => e.message)
            });
        }

        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al crear el libro',
            error: error.message
        });
    }
});

// Actualizar un libro existente
aplicacion.put('/api/libros/:id', async (peticion, respuesta) => {
    try {
        const idLibro = parseInt(peticion.params.id);
        const datosActualizacion = peticion.body;

        if (isNaN(idLibro)) {
            return respuesta.status(400).json({
                exito: false,
                mensaje: 'ID de libro inválido'
            });
        }

        const libroExistente = await Libro.findByPk(idLibro);
        
        if (!libroExistente) {
            return respuesta.status(404).json({
                exito: false,
                mensaje: `No se encontró el libro con ID ${idLibro}`
            });
        }

        await libroExistente.update(datosActualizacion);
        
        respuesta.json({
            exito: true,
            mensaje: 'Libro actualizado exitosamente',
            datos: libroExistente
        });

    } catch (error) {
        console.error(`❌ Error en PUT /api/libros/${peticion.params.id}:`, error);
        
        if (error.name === 'SequelizeValidationError') {
            return respuesta.status(400).json({
                exito: false,
                mensaje: 'Datos de validación incorrectos',
                errores: error.errors.map(e => e.message)
            });
        }

        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al actualizar el libro',
            error: error.message
        });
    }
});

// Eliminar un libro
aplicacion.delete('/api/libros/:id', async (peticion, respuesta) => {
    try {
        const idLibro = parseInt(peticion.params.id);

        if (isNaN(idLibro)) {
            return respuesta.status(400).json({
                exito: false,
                mensaje: 'ID de libro inválido'
            });
        }

        const filasEliminadas = await Libro.destroy({
            where: { IdLibro: idLibro }
        });

        if (filasEliminadas === 0) {
            return respuesta.status(404).json({
                exito: false,
                mensaje: `No se encontró el libro con ID ${idLibro}`
            });
        }

        respuesta.json({
            exito: true,
            mensaje: `Libro con ID ${idLibro} eliminado correctamente`
        });

    } catch (error) {
        console.error(`❌ Error en DELETE /api/libros/${peticion.params.id}:`, error);
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al eliminar el libro',
            error: error.message
        });
    }
});

// Inicialización de la aplicación
async function iniciarServidor() {
    try {
        console.log('🔄 Sincronizando base de datos...');
        await baseDatos.sync({ force: true });
        console.log('✅ Base de datos sincronizada correctamente.');
        
        await inicializarDatos();
        
        aplicacion.listen(puerto, () => {
            console.log(`🚀 Servidor iniciado en http://localhost:${puerto}`);
            console.log('📋 Endpoints disponibles:');
            console.log('   GET    / - Información de la API');
            console.log('   GET    /api/libros - Listar todos los libros');
            console.log('   GET    /api/libros?search=termino - Buscar libros');
            console.log('   GET    /api/libros/:id - Obtener libro por ID');
            console.log('   POST   /api/libros - Crear nuevo libro');
            console.log('   PUT    /api/libros/:id - Actualizar libro');
            console.log('   DELETE /api/libros/:id - Eliminar libro');
        });
        
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

// Manejo de errores no capturados
process.on('unhandledRejection', (razon, promesa) => {
    console.error('❌ Promesa rechazada no manejada:', razon);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Excepción no capturada:', error);
    process.exit(1);
});

// Iniciar la aplicación
iniciarServidor();