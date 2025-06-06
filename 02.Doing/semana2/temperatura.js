/**
 * Módulo de conversión de temperaturas entre Celsius, Fahrenheit y Kelvin.
 *
 * Contiene funciones para convertir temperaturas entre las siguientes escalas:
 * - Celsius a Fahrenheit
 * - Fahrenheit a Celsius
 * - Celsius a Kelvin
 * - Fahrenheit a Kelvin
 */

/**
 * Convierte una temperatura de grados Celsius a Fahrenheit.
 * @param {number} tempeture - Temperatura en grados Celsius.
 * @returns {number} Temperatura convertida a grados Fahrenheit.
 */
export function convertCelsiusToFahrenheit(tempeture) {
  let gF = 0;
  gF = (tempeture * 9 / 5) + 32;
  return gF;
}

/**
 * Convierte una temperatura de grados Fahrenheit a Celsius.
 * @param {number} tempeture - Temperatura en grados Fahrenheit.
 * @returns {number} Temperatura convertida a grados Celsius.
 */
export function convertFahrenheitToCelsius(tempeture) {
  let gC = 0;
  gC = (tempeture - 32) * 5 / 9;
  return gC;
}

/**
 * Convierte una temperatura de grados Celsius a Kelvin.
 * @param {number} temperatura - Temperatura en grados Celsius.
 * @returns {number} Temperatura convertida a Kelvin.
 */
export function exportCelsiusToKelvin(temperatura) {
  let result = temperatura + 273.15;
  return result;
}

/**
 * Convierte una temperatura de grados Fahrenheit a Kelvin.
 * @param {number} temperatura - Temperatura en grados Fahrenheit.
 * @returns {number} Temperatura convertida a Kelvin.
 */
export function exportFahrenheitToKelvin(temperatura) {
  let result = 273.15 + (5 / 9) * (temperatura - 32);
  return result;
}