/**
 * Invierte una cadena de texto
 *
 * Esta función toma una cadena de texto y devuelve una nueva cadena
 * con los caracteres en orden inverso.
 *
 * @function invertirCadena
 * @param {string} texto - La cadena de texto a invertir
 * @returns {string} La cadena invertida
 *
 * @example
 * invertirCadena('hola');     // 'aloh'
 * invertirCadena('Node.js');  // 'sj.edoN'
 * invertirCadena('12345');    // '54321'
 * invertirCadena('');         // ''
 * invertirCadena('a');        // 'a'
 */
export function invertirCadena(texto) {
  // Validación: verificar que el parámetro sea una cadena
  if (typeof texto !== 'string') {
    throw new Error('El parámetro debe ser una cadena de texto');
  }

  // Método 1: Usar métodos de array (más legible y funcional)
  // 1. split('') convierte la cadena en array de caracteres
  // 2. reverse() invierte el orden del array
  // 3. join('') convierte el array de vuelta a cadena
  return texto.split('').reverse().join('');
}

/**
 * Implementación alternativa usando un bucle for tradicional
 * Más eficiente en memoria para cadenas muy largas
 *
 * @function invertirCadenaFor
 * @param {string} texto - La cadena de texto a invertir
 * @returns {string} La cadena invertida
 */
export function invertirCadenaFor(texto) {
  if (typeof texto !== 'string') {
    throw new Error('El parámetro debe ser una cadena de texto');
  }

  // Inicializa una cadena vacía para acumular el resultado
  let resultado = '';

  // Itera desde el último carácter hasta el primero
  // i = texto.length - 1 (último índice), hasta i >= 0
  for (let i = texto.length - 1; i >= 0; i--) {
    // Concatena cada carácter en orden inverso
    resultado += texto[i];
  }

  return resultado;
}

/**
 * Implementación recursiva (elegante pero menos eficiente para cadenas largas)
 *
 * @function invertirCadenaRecursiva
 * @param {string} texto - La cadena de texto a invertir
 * @returns {string} La cadena invertida
 */
export function invertirCadenaRecursiva(texto) {
  if (typeof texto !== 'string') {
    throw new Error('El parámetro debe ser una cadena de texto');
  }

  // Caso base: cadena vacía o de un solo carácter
  if (texto.length <= 1) {
    return texto;
  }

  // Caso recursivo: último carácter + invertir el resto
  // texto.slice(1) obtiene todos los caracteres excepto el primero
  // texto[0] es el primer carácter
  return invertirCadenaRecursiva(texto.slice(1)) + texto[0];
}

/**
 * Implementación usando reduce (enfoque funcional avanzado)
 *
 * @function invertirCadenaReduce
 * @param {string} texto - La cadena de texto a invertir
 * @returns {string} La cadena invertida
 */
export function invertirCadenaReduce(texto) {
  if (typeof texto !== 'string') {
    throw new Error('El parámetro debe ser una cadena de texto');
  }

  // Convierte a array, usa reduce para construir la cadena invertida
  // En cada iteración, añade el carácter actual al inicio del acumulador
  return texto.split('').reduce((acumulador, caracter) => caracter + acumulador, '');
}

/**
 * Implementación optimizada para cadenas muy largas usando array
 *
 * @function invertirCadenaOptimizada
 * @param {string} texto - La cadena de texto a invertir
 * @returns {string} La cadena invertida
 */
export function invertirCadenaOptimizada(texto) {
  if (typeof texto !== 'string') {
    throw new Error('El parámetro debe ser una cadena de texto');
  }

  // Crear array con la longitud exacta (más eficiente en memoria)
  const resultado = new Array(texto.length);

  // Llenar el array en orden inverso
  for (let i = 0; i < texto.length; i++) {
    resultado[texto.length - 1 - i] = texto[i];
  }

  // Convertir a cadena una sola vez
  return resultado.join('');
}