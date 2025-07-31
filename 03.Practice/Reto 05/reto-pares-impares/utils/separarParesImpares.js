/**
 * Separa un array de números en pares e impares
 * @param {number[]} numeros - Array de números a separar
 * @returns {Object} Objeto con arrays pares e impares
 */
function separarParesImpares(numeros) {
  if (!Array.isArray(numeros) || numeros.length === 0) {
    throw new Error('Debe proporcionar un array válido con al menos un número');
  }

  const pares = numeros.filter(numero => numero % 2 === 0);
  const impares = numeros.filter(numero => numero % 2 !== 0);

  return {
    pares,
    impares
  };
}

/**
 * Valida que todos los elementos del array sean números válidos
 * @param {string[]} numerosString - Array de strings a validar
 * @returns {number[]} Array de números válidos
 */
function validarNumeros(numerosString) {
  const numeros = numerosString.map(numStr => {
    const numero = Number(numStr.trim());
    if (isNaN(numero)) {
      throw new Error(`"${numStr.trim()}" no es un número válido`);
    }
    return numero;
  });

  return numeros;
}

module.exports = {
  separarParesImpares,
  validarNumeros
};