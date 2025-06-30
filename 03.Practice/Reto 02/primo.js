/**
 * Determina si un número es primo
 *
 * Un número primo es un número natural mayor que 1 que tiene únicamente dos divisores:
 * el 1 y él mismo. Los números primos son fundamentales en matemáticas y criptografía.
 *
 * @function esPrimo
 * @param {number} n - El número a verificar
 * @returns {boolean} true si el número es primo, false en caso contrario
 *
 * @example
 * esPrimo(2);  // true  (primer número primo)
 * esPrimo(17); // true  (número primo)
 * esPrimo(4);  // false (divisible por 2)
 * esPrimo(1);  // false (no es primo por definición)
 * esPrimo(0);  // false (no es primo)
 */
export function esPrimo(n) {
  // Validación: números menores o iguales a 1 no son primos
  // Por definición matemática, los números primos deben ser mayores que 1
  if (n <= 1) return false;

  // El número 2 es el único número primo par
  // Es un caso especial que debe manejarse por separado
  if (n === 2) return true;

  // Los números pares (excepto 2) no pueden ser primos
  // Si un número par > 2 es divisible por 2, entonces no es primo
  if (n % 2 === 0) return false;

  // Optimización: solo verificar divisores impares hasta la raíz cuadrada
  // Si n tiene un divisor mayor que √n, entonces también tiene uno menor que √n
  // Esto reduce significativamente el número de iteraciones necesarias
  const limite = Math.sqrt(n);

  // Itera solo a través de números impares desde 3 hasta √n
  // Incrementa de 2 en 2 para saltar números pares (3, 5, 7, 9, 11, ...)
  for (let i = 3; i <= limite; i += 2) {
    // Si encontramos un divisor, el número no es primo
    if (n % i === 0) return false;
  }

  // Si no se encontraron divisores, el número es primo
  return true;
}