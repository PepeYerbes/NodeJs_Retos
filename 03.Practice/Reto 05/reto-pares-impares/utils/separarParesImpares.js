
/**
 * Separa un array de números en pares e impares
 * @param {number[]} numeros - Array de números a separar
 * @returns {Object} Objeto con arrays pares e impares
 */

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
