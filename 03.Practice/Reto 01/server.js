// 🧠 Ejercicio 1: Suma de Dos Números

/**
 * Escribe una función que reciba dos números y devuelva su suma.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  // TODO: Escribe tu solución aquí
  return a + b;
}

// Pruebas para sum
console.log("Suma:");
console.log(`sum(3, 5) = ${sum(3, 5)} (esperado: 8)`);
console.log(`sum(-1, 6) = ${sum(-1, 6)} (esperado: 5)`);
console.log(`sum(50, 60) = ${sum(50, 60)} (esperado: 110)`);
console.log(`sum(100, 50) = ${sum(100, 50)} (esperado: 150)`);
console.log(`sum(1000, -552) = ${sum(1000, -552)} (esperado: 448 )`);
console.log(`sum(75, 75) = ${sum(75, 75)} (esperado: 150)`);

console.log("\n");

// 🔢 Ejercicio 2: Convertir un Número a Texto

/**
 * Escribe una función que reciba un número y devuelva su versión como string.
 * @param {number} num
 * @returns {string}
 */
function numberToString(num) {
  // TODO: Escribe tu solución aquí
  

return num.toString();

}

// Pruebas para numberToString
console.log("Conversión a string:");
console.log(`numberToString(123) = "${numberToString(123)}" (esperado: "123")`);
console.log(`numberToString(0) = "${numberToString(0)}" (esperado: "0")`);
console.log(`numberToString(-5) = "${numberToString(-5)}" (esperado: "-5")`);
console.log(`numberToString(9999) = "${numberToString(9999)}" (esperado: "9999")`);
console.log(`numberToString(1000) = "${numberToString(1000)}" (esperado: "1000")`);
console.log(`numberToString(88888) = "${numberToString(88888)}" (esperado: "888888")`);