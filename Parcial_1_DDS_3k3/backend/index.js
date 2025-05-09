const express = require('express');
const cors = require('cors');
// Importa Op para operadores de Sequelize, necesario para la búsqueda
const { Sequelize, DataTypes, Op } = require('sequelize');
const app = express();
const port = 3000; // Puerto para el backend

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de Sequelize con SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './motos.sqlite'
});


const Moto = sequelize.define('Moto', {
    IdMoto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AñoFabricacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Cilindrada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    FechaIngreso: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    timestamps: false
});

async function seedDatabase() {
    try {
        const count = await Moto.count();
        if (count === 0) {
            console.log('Base de datos de motos vacía. Insertando 40 datos iniciales...');
            const motosIniciales = [
                { Marca: 'Honda', Modelo: 'CBR 600RR', AñoFabricacion: 2022, Cilindrada: 600, FechaIngreso: '2022-03-15', Precio: 12500.99 },
                { Marca: 'Yamaha', Modelo: 'MT-09', AñoFabricacion: 2023, Cilindrada: 890, FechaIngreso: '2023-01-10', Precio: 9800.50 },
                { Marca: 'Kawasaki', Modelo: 'Ninja ZX-10R', AñoFabricacion: 2022, Cilindrada: 998, FechaIngreso: '2022-11-05', Precio: 16999.00 },
                { Marca: 'Ducati', Modelo: 'Panigale V4', AñoFabricacion: 2023, Cilindrada: 1103, FechaIngreso: '2023-02-20', Precio: 28500.75 },
                { Marca: 'BMW', Modelo: 'S 1000 RR', AñoFabricacion: 2022, Cilindrada: 999, FechaIngreso: '2022-08-15', Precio: 22000.00 },
                { Marca: 'Suzuki', Modelo: 'GSX-R750', AñoFabricacion: 2021, Cilindrada: 750, FechaIngreso: '2021-12-03', Precio: 13500.90 },
                { Marca: 'KTM', Modelo: '390 Duke', AñoFabricacion: 2023, Cilindrada: 373, FechaIngreso: '2023-04-05', Precio: 5990.99 },
                { Marca: 'Aprilia', Modelo: 'RSV4', AñoFabricacion: 2022, Cilindrada: 1099, FechaIngreso: '2022-07-22', Precio: 19800.00 },
                { Marca: 'Triumph', Modelo: 'Street Triple', AñoFabricacion: 2023, Cilindrada: 765, FechaIngreso: '2023-03-18', Precio: 11200.00 },
                { Marca: 'Harley-Davidson', Modelo: 'Sportster S', AñoFabricacion: 2022, Cilindrada: 1250, FechaIngreso: '2022-05-30', Precio: 15000.50 },
                { Marca: 'Honda', Modelo: 'Africa Twin', AñoFabricacion: 2023, Cilindrada: 1084, FechaIngreso: '2023-01-25', Precio: 14500.00 },
                { Marca: 'Yamaha', Modelo: 'YZF-R1', AñoFabricacion: 2022, Cilindrada: 998, FechaIngreso: '2022-06-12', Precio: 18000.25 },
                { Marca: 'Kawasaki', Modelo: 'Z900', AñoFabricacion: 2023, Cilindrada: 948, FechaIngreso: '2023-02-08', Precio: 9500.75 },
                { Marca: 'Ducati', Modelo: 'Monster', AñoFabricacion: 2021, Cilindrada: 937, FechaIngreso: '2021-09-10', Precio: 12300.00 },
                { Marca: 'BMW', Modelo: 'R 1250 GS', AñoFabricacion: 2022, Cilindrada: 1254, FechaIngreso: '2022-04-15', Precio: 19900.80 },
                { Marca: 'Suzuki', Modelo: 'V-Strom 1050', AñoFabricacion: 2023, Cilindrada: 1037, FechaIngreso: '2023-03-05', Precio: 13999.99 },
                { Marca: 'KTM', Modelo: '1290 Super Duke R', AñoFabricacion: 2022, Cilindrada: 1301, FechaIngreso: '2022-10-20', Precio: 20500.40 },
                { Marca: 'Aprilia', Modelo: 'Tuono V4', AñoFabricacion: 2023, Cilindrada: 1077, FechaIngreso: '2023-05-01', Precio: 16800.00 },
                { Marca: 'Triumph', Modelo: 'Trident 660', AñoFabricacion: 2021, Cilindrada: 660, FechaIngreso: '2021-11-12', Precio: 8900.00 },
                { Marca: 'Harley-Davidson', Modelo: 'Fat Boy', AñoFabricacion: 2022, Cilindrada: 1868, FechaIngreso: '2022-09-08', Precio: 20100.00 },
                { Marca: 'Honda', Modelo: 'Rebel 500', AñoFabricacion: 2023, Cilindrada: 471, FechaIngreso: '2023-04-22', Precio: 6700.50 },
                { Marca: 'Yamaha', Modelo: 'Ténéré 700', AñoFabricacion: 2022, Cilindrada: 689, FechaIngreso: '2022-03-28', Precio: 10500.00 },
                { Marca: 'Kawasaki', Modelo: 'Versys 650', AñoFabricacion: 2021, Cilindrada: 649, FechaIngreso: '2021-08-15', Precio: 8999.99 },
                { Marca: 'Ducati', Modelo: 'Multistrada V4', AñoFabricacion: 2023, Cilindrada: 1158, FechaIngreso: '2023-01-05', Precio: 24000.00 },
                { Marca: 'BMW', Modelo: 'F 900 R', AñoFabricacion: 2022, Cilindrada: 895, FechaIngreso: '2022-07-01', Precio: 10200.00 },
                { Marca: 'Suzuki', Modelo: 'Hayabusa', AñoFabricacion: 2023, Cilindrada: 1340, FechaIngreso: '2023-06-10', Precio: 18500.00 },
                { Marca: 'KTM', Modelo: '890 Adventure', AñoFabricacion: 2022, Cilindrada: 889, FechaIngreso: '2022-05-19', Precio: 13800.75 },
                { Marca: 'Aprilia', Modelo: 'RS 660', AñoFabricacion: 2021, Cilindrada: 659, FechaIngreso: '2021-10-30', Precio: 11000.00 },
                { Marca: 'Triumph', Modelo: 'Rocket 3', AñoFabricacion: 2023, Cilindrada: 2458, FechaIngreso: '2023-02-15', Precio: 22500.20 },
                { Marca: 'Harley-Davidson', Modelo: 'Street Glide', AñoFabricacion: 2022, Cilindrada: 1868, FechaIngreso: '2022-11-15', Precio: 26000.00 },
                { Marca: 'Honda', Modelo: 'CB500F', AñoFabricacion: 2023, Cilindrada: 471, FechaIngreso: '2023-03-12', Precio: 7200.00 },
                { Marca: 'Yamaha', Modelo: 'XSR900', AñoFabricacion: 2022, Cilindrada: 890, FechaIngreso: '2022-02-25', Precio: 10800.00 },
                { Marca: 'Kawasaki', Modelo: 'H2 SX', AñoFabricacion: 2023, Cilindrada: 998, FechaIngreso: '2023-05-20', Precio: 25500.00 },
                { Marca: 'Ducati', Modelo: 'Scrambler', AñoFabricacion: 2021, Cilindrada: 803, FechaIngreso: '2021-07-08', Precio: 9500.99 },
                { Marca: 'BMW', Modelo: 'G 310 R', AñoFabricacion: 2022, Cilindrada: 313, FechaIngreso: '2022-08-05', Precio: 5200.70 },
                { Marca: 'Suzuki', Modelo: 'SV650', AñoFabricacion: 2023, Cilindrada: 645, FechaIngreso: '2023-04-18', Precio: 7900.00 },
                { Marca: 'KTM', Modelo: '1290 Super Adventure', AñoFabricacion: 2022, Cilindrada: 1301, FechaIngreso: '2022-12-10', Precio: 18500.00 },
                { Marca: 'Aprilia', Modelo: 'Dorsoduro 900', AñoFabricacion: 2021, Cilindrada: 896, FechaIngreso: '2021-11-20', Precio: 11500.00 },
                { Marca: 'Triumph', Modelo: 'Tiger 900', AñoFabricacion: 2023, Cilindrada: 888, FechaIngreso: '2023-01-28', Precio: 14200.00 },
                { Marca: 'Harley-Davidson', Modelo: 'Iron 883', AñoFabricacion: 2022, Cilindrada: 883, FechaIngreso: '2022-06-30', Precio: 11300.00 }
            ];
            await Moto.bulkCreate(motosIniciales);
            console.log('40 datos iniciales de motos insertados correctamente.');
        } else {
            console.log('La base de datos ya contiene datos de motos. Saltando inserción inicial.');
        }
    } catch (error) {
        console.error('Error al insertar datos iniciales de motos:', error);
    }
}

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Backend de Gestión de Motos Funcionando!');
});

// Rutas API para motos
app.get('/api/motos', async (req, res) => {
    try {
        const buscarMarca = req.query.buscarMarca;
        let motos;

        if (buscarMarca) {
            // Filtrar por marca (case insensitive)
            motos = await Moto.findAll({
                where: {
                    Marca: {
                        [Op.like]: `%${buscarMarca}%`  // Búsqueda parcial
                    }
                }
            });
        } else {
            // Obtener todas las motos si no hay parámetro de búsqueda
            motos = await Moto.findAll();
        }

        res.json(motos);
    } catch (error) {
        console.error('Error al obtener motos:', error);
        res.status(500).json({ error: 'Error al obtener motos' });
    }
});


// Sincronizar el modelo con la base de datos y luego iniciar el servidor
sequelize.sync({ force: true }) // Usar { force: true } en desarrollo para recrear tablas cada vez
    .then(() => {
        console.log('Base de datos sincronizada (tablas recreadas).');
        return seedDatabase(); // Cargar datos después de sincronizar
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor de Backend para Gestión de Motos escuchando en http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos o sembrar datos:', err);
    });