// Importo la librería seedrandom para generar números aleatorios con una semilla específica
const seedrandom = require("seedrandom");
const random = seedrandom(1763519);
let numerosAleatorios = Array.from({ length: 1000000 }, () => random.int32());

// Inicializo contadores para los números positivos y negativos
let positivos = 0;
let negativos = 0;

// Recorro el arreglo de números generados para contar cuántos son positivos y cuántos son negativos
numerosAleatorios.forEach(numero => {
    if (numero > 0) {
        positivos++; // Incrementamos el contador de positivos si el número es mayor a 0
    } else if (numero < 0) {
        negativos++; // Incrementamos el contador de negativos si el número es menor a 0
    }
});

//Cantidad de números cuyo resto al dividirlos en 7 sea exactamente 0, 3, 5 o 6.
let contadorResto = 0;

numerosAleatorios.forEach(numero => {
    if (numero % 7 === 0 || numero % 7 === 3 || numero % 7 === 5 || numero % 7 === 6) {
        contadorResto++; // Incrementamos el contador si cumple la condición
    }
});

// Arreglo de contadores inicializado en 0
let contadoresDecenas = Array(10).fill(0);

// Recorro el arreglo de números
numerosAleatorios.forEach(numero => {
    // Calculamos el anteúltimo dígito (dígito de las decenas)
    let decena = Math.floor(Math.abs(numero) / 10) % 10;
    contadoresDecenas[decena]++; // Incrementamos el contador correspondiente
});

// Inicializo variables para el menor valor y su posición
let menor = Infinity;
let posicionMenor = -1;

// Recorro el arreglo de números
numerosAleatorios.forEach((numero, index) => {
    if (numero < menor) {
        menor = numero; // Actualizamos el menor valor
        posicionMenor = index + 1; // Guardamos la posición (número de orden)
    }
});

// Inicializo el contador de numeros de igual signo al anterior
let contadorSignoIgual = 0;

// Recorro el arreglo desde el segundo elemento
for (let i = 1; i < numerosAleatorios.length; i++) {
    if (Math.sign(numerosAleatorios[i]) === Math.sign(numerosAleatorios[i - 1])) {
        contadorSignoIgual++; // Incrementamos el contador si los signos son iguales
    }
}


//6
let suma = 0;
let contador = 0;

numerosAleatorios.forEach((num) => {
  let numAbsoluto = Math.abs(num);
  let numString = numAbsoluto.toString();

  if (numString.length === 6) {
    suma += num;
    contador++;
  }
});

let promedio = Math.round(suma / contador);




// Mostramos los resultados en la consola
console.log('Cantidad de números positivos:', positivos);
console.log('Cantidad de números negativos:', negativos);
console.log('Cantidad de números cuyo resto al dividirlos entre 7 es 0, 3, 5 o 6:', contadorResto);
console.log('Contadores según el anteúltimo dígito:', contadoresDecenas);
console.log('El menor valor es:', menor);
console.log('La posición del menor valor es:', posicionMenor);
console.log('Cantidad de números cuyo signo es igual al del anterior:', contadorSignoIgual);
console.log('Promedio entero de números con exactamente 6 dígitos:', promedio);