const seedrandom = require('seedrandom');
const rng = seedrandom('1763519');

const totalNumbers = 1000000;
const numbers = [];

for (let i = 0; i < totalNumbers; i++) {
  numbers.push(rng.int32());
}

// 1. Cantidad de positivos y negativos
let positivos = 0;
let negativos = 0;

// 2. Cantidad de números cuyo resto al dividirlos por 7 sea 0, 3, 5 o 6
let restoDiv7 = 0;

// 3. Arreglo de contadores según anteúltimo dígito
const decenasCount = { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 };

// 4. Valor y posición del menor
let menorValor = Number.MAX_SAFE_INTEGER;
let menorPos = -1;

// 5. Cantidad de números con mismo signo que el anterior
let mismoSignoQueAnterior = 0;

// 6. Promedio entero de números con exactamente 6 dígitos
let sumaSeisDigitos = 0;
let cantidadSeisDigitos = 0;

for (let i = 0; i < totalNumbers; i++) {
  const num = numbers[i];

  // Positivos / Negativos
  if (num >= 0) positivos++;
  else negativos++;

  // Resto división por 7
  const resto = Math.abs(num % 7);
  if ([0, 3, 5, 6].includes(resto)) {
    restoDiv7++;
  }

  // Anteúltimo dígito (decenas)
  const numAbs = Math.abs(num);
  if (numAbs >= 10) {
    const decena = Math.floor((numAbs % 100) / 10);
    decenasCount[decena]++;
  } else {
    decenasCount[0]++;
  }

  // Menor valor y su posición
  if (num < menorValor) {
    menorValor = num;
    menorPos = i + 1; // posición desde 1
  }

  // Mismo signo que el anterior
  if (i > 0) {
    const signoActual = Math.sign(num);
    const signoAnterior = Math.sign(numbers[i - 1]);
    if (signoActual === signoAnterior) {
      mismoSignoQueAnterior++;
    }
  }

  // Números con exactamente 6 dígitos
  const lengthNum = numAbs.toString().length;
  if (lengthNum === 6) {
    sumaSeisDigitos += num;
    cantidadSeisDigitos++;
  }
}

const promedioSeisDigitos = cantidadSeisDigitos > 0
  ? Math.round(sumaSeisDigitos / cantidadSeisDigitos)
  : 0;

// Resultados
console.log("1. Positivos:", positivos);
console.log("1. Negativos:", negativos);
console.log("2. Restos 0,3,5,6:", restoDiv7);
console.log("3. Conteo por decenas:", decenasCount);
console.log("4. Menor valor:", menorValor, "Posición:", menorPos);
console.log("5. Mismo signo que anterior:", mismoSignoQueAnterior);
console.log("6. Promedio de números con 6 dígitos:", promedioSeisDigitos);
