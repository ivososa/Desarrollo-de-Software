const fs = require('fs');

// Leer archivo y convertir a array de objetos
const data = fs.readFileSync('./personas.json', 'utf-8');
const personas = JSON.parse(data);

// 1. Promedio entero de edades
const promedioEdades = Math.floor(personas.reduce((sum, p) => sum + p.edad, 0) / personas.length);

// 2. Persona más joven
const masJoven = personas.reduce((joven, actual) => actual.edad < joven.edad ? actual : joven);

// 3. Personas con apellido GOMEZ ordenadas alfabéticamente
const gomez = personas
  .filter(p => p.apellido === 'GOMEZ')
  .map(p => p.nombre)
  .sort()
  .join(', ');

// 4. Suma de edades con nombre de longitud par y apellido de longitud impar
const sumaLongitudes = personas
  .filter(p => p.nombre.length % 2 === 0 && p.apellido.length % 2 !== 0)
  .reduce((sum, p) => sum + p.edad, 0);

// 5. JSON con mayores, menores, primeraMitad, segundaMitad
const estadisticas = {
  mayores: personas.filter(p => p.edad > 18).length,
  menores: personas.filter(p => p.edad <= 18).length,
  primeraMitad: personas.filter(p => /^[A-L]/.test(p.apellido)).length,
  segundaMitad: personas.filter(p => /^[M-Z]/.test(p.apellido)).length
};

// 6. JSON con conteo por apellido
const apellidosBuscados = ['CASTILLO', 'DIAZ', 'FERRER', 'PINO', 'ROMERO'];
const conteoApellidos = {};

for (const apellido of apellidosBuscados) {
  conteoApellidos[apellido] = personas.filter(p => p.apellido === apellido).length;
}

// Mostrar resultados
console.log('1. Promedio de edades:', promedioEdades);
console.log('2. Persona más joven:', `${masJoven.nombre} ${masJoven.apellido}`);
console.log('3. Nombres con apellido GOMEZ:', gomez || 'Ninguno');
console.log('4. Suma de edades (nombre par, apellido impar):', sumaLongitudes);
console.log('5. Estadísticas generales:', JSON.stringify(estadisticas, null, 2));
console.log('6. Conteo de apellidos específicos:', JSON.stringify(conteoApellidos, null, 2));
