/**
<<<<<<< HEAD
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
=======
 * Encuentra el número mayor en un arreglo
 * @param {number[]} numeros - Array de números
 * @returns {number} - El número mayor
 */
function encontrarMayor(numeros) {
  if (!Array.isArray(numeros) || numeros.length === 0) {
    throw new Error('Debe proporcionar un array válido con al menos un número');
  }

  // Verificar que todos sean números válidos
  const numerosValidos = numeros.every(num => !isNaN(num) && typeof num === 'number');
  if (!numerosValidos) {
    throw new Error('Todos los valores deben ser números válidos');
  }

  return Math.max(...numeros);
}

module.exports = encontrarMayor;
>>>>>>> upstream/main
