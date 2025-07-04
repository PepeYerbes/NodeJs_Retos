/**
 * Encuentra el número mayor en un array
 * @param {number[]} numeros - Array de números
 * @returns {number} Número mayor
 */
export function encontrarMayor(numeros) {
return Math.max(...numeros);
}

/**
 * Valida un string de números separados por comas
 * @param {string} str - Cadena de números
 * @returns {number[]|null} Array de números o null si hay error
 */
export function ValidarNumeros(str) {
const numeros = str.split(',').map(n => Number(n.trim()));
if (numeros.some(isNaN)) return null;
return numeros;
}
