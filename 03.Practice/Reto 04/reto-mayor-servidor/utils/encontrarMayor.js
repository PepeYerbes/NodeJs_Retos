/**
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