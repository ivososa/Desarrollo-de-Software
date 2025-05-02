const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000; // Puerto para el backend

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite a Express leer JSON

// Configuración de Sequelize con SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './veterinaria.sqlite' // Archivo de base de datos
});

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
}, {
    // Opciones adicionales del modelo
    // timestamps: false // Descomentar si no quieren que Sequelize agregue campos createdAt y updatedAt
});

// Función para cargar datos iniciales (Seeding)
async function seedDatabase() {
    try {
        const count = await Paciente.count();
        if (count === 0) {
            console.log('Base de datos de pacientes vacía. Insertando datos iniciales...');
            const pacientesIniciales = [
                { NombreMascota: 'Fido', Propietario: 'Juan Perez', Telefono: '1122334455' },
                { NombreMascota: 'Michi', Propietario: 'Maria Garcia', Telefono: '3515566778' },
                { NombreMascota: 'Rex', Propietario: 'Juan Perez', Telefono: '1122334455' }, 
                { NombreMascota: 'Nina', Propietario: 'Carlos Lopez', Telefono: '1133445566' },
                { NombreMascota: 'Capitán', Propietario: 'Maria Garcia', Telefono: '3515566778' }, 
                { NombreMascota: 'Luna', Propietario: 'Ana Rodriguez', Telefono: '3415544332' },
                { NombreMascota: 'Toto', Propietario: 'Carlos Lopez', Telefono: '1133445566' }, 
                { NombreMascota: 'Sol', Propietario: 'Ana Rodriguez', Telefono: '3415544332' }, 
                { NombreMascota: 'Toby', Propietario: 'Jose Fernandez', Telefono: '2216677889' },
                { NombreMascota: 'Lola', Propietario: 'Laura Diaz', Telefono: '1144556677' },
                { NombreMascota: 'Simon', Propietario: 'Laura Diaz', Telefono: '1144556677' }, 
                { NombreMascota: 'Mora', Propietario: 'Martin Martinez', Telefono: '3516677889' },
                { NombreMascota: 'Teo', Propietario: 'Martin Martinez', Telefono: '3516677889' }, 
                { NombreMascota: 'Coco', Propietario: 'Sofia Gonzalez', Telefono: '3415566778' },
                { NombreMascota: 'Nala', Propietario: 'Sofia Gonzalez', Telefono: '3415566778' }, 
                { NombreMascota: 'Zeus', Propietario: 'Pablo Sanchez', Telefono: '1155667788' },
                { NombreMascota: 'Kira', Propietario: 'Paula Ramirez', Telefono: '3517788990' },
                { NombreMascota: 'Romeo', Propietario: 'Paula Ramirez', Telefono: '3517788990' }, 
                { NombreMascota: 'Julieta', Propietario: 'Diego Torres', Telefono: '2217788990' },
                { NombreMascota: 'Dante', Propietario: 'Valeria Acosta', Telefono: '1166778899' },
                { NombreMascota: 'Frida', Propietario: 'Valeria Acosta', Telefono: '1166778899' }, 
                { NombreMascota: 'Astor', Propietario: 'Mateo Benitez', Telefono: '3518899001' },
                { NombreMascota: 'Milo', Propietario: 'Lucia Romero', Telefono: '3416677889' },
                { NombreMascota: 'Otto', Propietario: 'Agustin Gimenez', Telefono: '1177889900' },
                { NombreMascota: 'Ciro', Propietario: 'Renata Vega', Telefono: '3519900112' },
                { NombreMascota: 'Emma', Propietario: 'Manuel Castro', Telefono: '2218899001' },
                { NombreMascota: 'Sofía', Propietario: 'Victoria Herrera', Telefono: '1188990011' },
                { NombreMascota: 'Benjamín', Propietario: 'Facundo Silva', Telefono: '3510011223' },
                { NombreMascota: 'Olivia', Propietario: 'Emilia Rojas', Telefono: '3417788990' },
                { NombreMascota: 'Mateo', Propietario: 'Emilia Rojas', Telefono: '3417788990' } 
            ];
            Paciente.bulkCreate(pacientesIniciales);
            console.log('Datos iniciales de pacientes insertados correctamente.');
        } else {
            console.log('La base de datos ya contiene datos de pacientes. Saltando inserción inicial.');
        }
    } catch (error) {
        console.error('Error al insertar datos iniciales:', error);
    }
}



app.get('/', (req, res) => {
    res.send('¡Backend de Veterinaria Funcionando!');
});



// Sincronizar el modelo con la base de datos y luego iniciar el servidor
sequelize.sync({ force: true }) // Usar { force: true } en desarrollo para recrear tablas
    .then(() => {
        console.log('Base de datos sincronizada.');
        return seedDatabase(); // Cargar datos después de sincronizar
    })
    .then(() => {
        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`Servidor de Backend para Veterinaria escuchando en http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos o sembrar datos:', err);
    });
