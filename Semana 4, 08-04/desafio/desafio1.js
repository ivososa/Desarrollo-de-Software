// Importo la librería seedrandom para generar números aleatorios con una semilla específica
const seedrandom = require('seedrandom');

// Inicializo el generador de números aleatorios con la semilla
const semilla = '1763519';
const rng = seedrandom(semilla, { state: true });

// Creo un arreglo para almacenar los números aleatorios generados
const numeros = [];

// Genero 1,000,000 de números aleatorios enteros utilizando el método int32
for (let i = 0; i < 1000000; i++) {
    // El método int32 genera un número entero de 32 bits (puede ser positivo o negativo)
    numeros.push(rng.int32());
}

// Inicializo contadores para los números positivos y negativos
let positivos = 0;
let negativos = 0;

// Recorro el arreglo de números generados para contar cuántos son positivos y cuántos son negativos
numeros.forEach(numero => {
    if (numero > 0) {
        positivos++; // Incrementamos el contador de positivos si el número es mayor a 0
    } else if (numero < 0) {
        negativos++; // Incrementamos el contador de negativos si el número es menor a 0
    }
});

//Cantidad de números cuyo resto al dividirlos en 7 sea exactamente 0, 3, 5 o 6.
let contadorResto = 0;

numeros.forEach(numero => {
    if (numero % 7 === 0 || numero % 7 === 3 || numero % 7 === 5 || numero % 7 === 6) {
        contadorResto++; // Incrementamos el contador si cumple la condición
    }
});

// Arreglo de contadores inicializado en 0
let contadoresDecenas = Array(10).fill(0);

// Recorro el arreglo de números
numeros.forEach(numero => {
    // Calculamos el anteúltimo dígito (dígito de las decenas)
    let decena = Math.floor(Math.abs(numero) / 10) % 10;
    contadoresDecenas[decena]++; // Incrementamos el contador correspondiente
});

// Inicializo variables para el menor valor y su posición
let menor = Infinity;
let posicionMenor = -1;

// Recorro el arreglo de números
numeros.forEach((numero, index) => {
    if (numero < menor) {
        menor = numero; // Actualizamos el menor valor
        posicionMenor = index + 1; // Guardamos la posición (número de orden)
    }
});

// Inicializo el contador de numeros de igual signo al anterior
let contadorSignoIgual = 0;

// Recorro el arreglo desde el segundo elemento
for (let i = 1; i < numeros.length; i++) {
    if (Math.sign(numeros[i]) === Math.sign(numeros[i - 1])) {
        contadorSignoIgual++; // Incrementamos el contador si los signos son iguales
    }
}


// Filtro los números con exactamente 6 dígitos
const numerosSeisDigitos = numeros.filter(numero => Math.abs(numero) >= 100000 && Math.abs(numero) <= 999999);

// Calculo la suma de los números con 6 dígitos
const sumaSeisDigitos = numerosSeisDigitos.reduce((acumulador, numero) => acumulador + numero, 0);

// Calculo el promedio redondeado
const promedioSeisDigitos = numerosSeisDigitos.length > 0 
    ? Math.round(sumaSeisDigitos / numerosSeisDigitos.length) 
    : 0;



// Mostramos los resultados en la consola
console.log('Cantidad de números positivos:', positivos);
console.log('Cantidad de números negativos:', negativos);
console.log('Cantidad de números cuyo resto al dividirlos entre 7 es 0, 3, 5 o 6:', contadorResto);
console.log('Contadores según el anteúltimo dígito:', contadoresDecenas);
console.log('El menor valor es:', menor);
console.log('La posición del menor valor es:', posicionMenor);
console.log('Cantidad de números cuyo signo es igual al del anterior:', contadorSignoIgual);
console.log('Promedio entero de números con exactamente 6 dígitos:', promedioSeisDigitos);