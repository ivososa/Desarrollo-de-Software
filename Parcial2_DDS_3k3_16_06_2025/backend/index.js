const express = require('express');
const cors = require('cors');
const sequelize = require('./database/database'); 
const ticketsRoutes = require('./routes/tickets.routes');

// Importar el modelo es necesario para la sincronización y el seeding
const Ticket = require('./models/ticket.model');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketsRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    await sequelize.sync({ force: false });
    console.log('Todos los modelos fueron sincronizados exitosamente.');

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`\nServidor escuchando en el puerto ${PORT}`);
      console.log(`API de Tickets disponible en http://localhost:${PORT}/api/tickets`);
    });
  } catch (error) {
    console.error('Error: No se pudo conectar a la base de datos:', error);
  }
}

async function seedDatabase() {
  try {
    const count = await Ticket.count();
    if (count === 0) {
      console.log('Base de datos vacía, insertando 10 registros de prueba...');
      
      await Ticket.bulkCreate([
        { nombreTarea: 'Actualizar servidor de producción', fecha: '2025-06-15', prioridad: 10 },
        { nombreTarea: 'Configurar firewall de red corporativa', fecha: '2025-06-10', prioridad: 9 },
        { nombreTarea: 'Revisar logs del servidor web por errores 5xx', fecha: '2025-05-28', prioridad: 8 },
        { nombreTarea: 'Instalar software de diseño en equipo de marketing', fecha: '2025-06-05', prioridad: 7 },
        { nombreTarea: 'Desarrollar endpoint para reporte de ventas', fecha: '2025-07-01', prioridad: 6 },
        { nombreTarea: 'Resolver problema de impresora en contabilidad', fecha: '2025-06-01', prioridad: 5 },
        { nombreTarea: 'Capacitación de nuevo personal en sistema CRM', fecha: '2025-06-03', prioridad: 4 },
        { nombreTarea: 'Crear cuenta de email para nuevo empleado', fecha: '2025-05-29', prioridad: 3 },
        { nombreTarea: 'Organizar archivos compartidos en el NAS', fecha: '2025-06-12', prioridad: 2 },
        { nombreTarea: 'Pedir cotización para renovación de licencias', fecha: '2025-06-30', prioridad: 1 },
      ]);
      
      console.log('Datos de prueba insertados exitosamente.');
    } else {
      console.log('La base de datos ya contiene datos. No se realizaron inserciones.');
    }
  } catch (error) {
    console.error('Error al intentar insertar datos de prueba:', error);
  }
}

main();