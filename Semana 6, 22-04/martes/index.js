// Ejemplo de asincronismo en JavaScript
console.log('Inicio de la espera...');

setTimeout(() => {
    console.log('Han pasado 2 segundos...');
}, 2000);

console.log('Pero yo me ejecuto inmediatamente despues');

//CALLBACKS
function leerArchivo(callback) {
    // Simulando lectura de archivo
    setTimeout(() => {
    const resultado = 'Contenido del archivo';
    callback(resultado);
    }, 1000);
}
leerArchivo((contenido) => {
    console.log(contenido);});

//PROMESAS
function leerArchivo() {
    return new Promise((resolve, reject) => {
    // Simulando lectura de archivo
        setTimeout(() => {
            const resultado = 'Contenido del archivo';
            resolve(resultado);
        }, 1000);
    });
}
leerArchivo()
    .then((contenido) => {
    console.log(contenido);
    })
    .catch((error) => {
    console.error(error);
    });
/*
//FETCH
fetch(url, parámetros) .then((res)=>{return res.json()})
// se obtiene el objeto respuesta
.then((json) => {...}) //procesa el objeto json con los datos
.catch((error) => {...}) // Procesa el error si existiera
.finally(() => {...}) //bloque opcional que se ejecuta siempre 
*/

fetch('https://restcountries.com/v3.1/alpha/arg')
 .then(response => response.json())
 .then(data => {
 console.log(data);
 })
 .catch(error => {
 console.error('Error:', error);
 });

 //ASYNC AWAIT
 async function fetchData(url) {
    try {
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.json();
    console.log('Datos recibidos:', data);
    } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    }
   }
   fetchData('https://pokeapi.co/api/v2/pokemon/');