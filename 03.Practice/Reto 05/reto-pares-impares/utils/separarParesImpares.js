<<<<<<< HEAD

=======
>>>>>>> upstream/main
/**
 * Separa un array de números en pares e impares
 * @param {number[]} numeros - Array de números a separar
 * @returns {Object} Objeto con arrays pares e impares
 */
<<<<<<< HEAD

export function separarParesImpares(numeros) {
    const pares = numeros.filter(n => n % 2 === 0);
    const impares = numeros.filter(n => n % 2 !== 0);
    return { pares, impares };
}

/**
 * Valida y convierte un string de números separados por comas a un array de números
 * @param {string} str - Cadena de números separados por comas
 * @returns {number[]|null} Array de números o null si hay error
 */
export function parsearNumeros(str, unique = false) {
    const numeros = str.split(',').map(n => Number(n.trim()));
    if (numeros.some(isNaN)) return null;
    return unique ? [...new Set(numeros)] : numeros;
}
=======
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
>>>>>>> upstream/main
