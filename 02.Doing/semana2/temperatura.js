/**
 * Módulo de conversión de temperaturas entre Celsius y Fahrenheit.
 *
 * Contiene dos funciones:
 * - convertCelsiusToFahrenheit: Convierte grados Celsius a Fahrenheit.
 * - convertFahrenheitToCelsius: Convierte grados Fahrenheit a Celsius.
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