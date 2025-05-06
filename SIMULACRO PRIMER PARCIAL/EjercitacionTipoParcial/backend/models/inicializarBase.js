const sequelize = require('./configurarSequelize');
const Paciente = require('./pacienteModels'); // Importa el modelo Paciente


inicializarBase();
async function inicializarBase() {
    try {
  
     // verfica si el archivo de base de datos existe
      const fs = require('fs');
      const path = require('path');
      const archivo = path.join(__dirname, '.././data/veterinaria.db');
      if (fs.existsSync(archivo)) {
        return;   // si existe lo deja tal cual
      }
      // si no existe, crea la base de datos
  
      // Sincroniza los modelos con la base de datos
      await sequelize.sync({ alter: true }); 
  
      // Crea datos de prueba
      await seedDatabase();  
  
      console.log('Base de datos inicializada y datos de prueba creados.');
  
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }
  
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

        