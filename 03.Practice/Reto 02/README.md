# 🧠 Reto: ¿Es un número primo?

Crea una aplicación de consola en Node.js para determinar si un número es primo. Practicarás:

- Modularización de funciones.
- Uso de condicionales y bucles.
- Entrada de usuario con [`inquirer`](https://www.npmjs.com/package/inquirer).
- Salida de colores con [`chalk`](https://www.npmjs.com/package/chalk).

---

## 🔎 Ejercicios similares en Codewars

¿Quieres practicar más? Prueba estos retos en Codewars:

| Nombre en Codewars      | Dificultad | Enlace                                                             |
| ----------------------- | ---------- | ------------------------------------------------------------------ |
| `Is this number prime?` | 6 kyu      | [Ver reto](https://www.codewars.com/kata/5262119038c0985a5b00029f) |
| `Prime Numbers`         | 7 kyu      | [Ver reto](https://www.codewars.com/kata/5526fc09a1bbd946250002dc) |
| `Primes in numbers`     | 5 kyu      | [Ver reto](https://www.codewars.com/kata/54d496788776e49e6b00052f) |

---

## 📘 ¿Qué es un número primo?

Un número **primo** es mayor que 1 y solo divisible entre 1 y él mismo.

- ✅ Ejemplos de primos: 2, 3, 5, 7, 11
- ❌ Ejemplos de no primos: 4, 6, 8, 9, 10

---

## ⚙️ Requisitos

- Tener Node.js instalado.
- Conocimientos básicos de funciones y condicionales.

---

## 🧱 Estructura del proyecto

```
primo-checker/
├── index.js      # Archivo principal
├── primo.js      # Función que evalúa si un número es primo
├── package.json
```

---

## 📦 Instalación

1. Crea el proyecto y entra en la carpeta:

   ```bash
   mkdir primo-checker
   cd primo-checker
   npm init -y
   ```

2. Instala las dependencias:

   ```bash
   npm install inquirer chalk
   ```

3. (Opcional) Si usas `import/export`, agrega en tu `package.json`:

   ```json
   "type": "module"
   ```

---

## ✍️ Implementación

**1. Crea el archivo `primo.js`:**

```js
// primo.js
export function esPrimo(n) {
  // TODO: funcionalidad para verificar si un número es primo
}
```

**2. Crea el archivo `index.js`:**

```js
// index.js
import inquirer from "inquirer";
import chalk from "chalk";
import { esPrimo } from "./primo.js";

inquirer
  .prompt([
    {
      type: "number",
      name: "numero",
      message: "Ingresa un número para verificar si es primo:",
    },
  ])
  .then((res) => {
    const { numero } = res;

    if (esPrimo(numero)) {
      console.log(chalk.green(`${numero} SÍ es un número primo ✅`));
    } else {
      console.log(chalk.red(`${numero} NO es un número primo ❌`));
    }
  });
```

---

## ▶️ ¿Cómo ejecutar?

```bash
node index.js
```

**Ejemplo de uso:**

```console
Ingresa un número para verificar si es primo: 17
17 SÍ es un número primo ✅
```

---

## 💡 Tip extra

Para hacer tu función más eficiente, puedes usar `Math.sqrt(n)` para limitar las comprobaciones al verificar si un número es primo.

---

## 📚 ¿Qué aprenderás?

- Crear módulos en Node.js.
- Usar lógica condicional y bucles.
- Interactuar con el usuario desde la terminal.
- Aplicar buenas prácticas con funciones reutilizables.

---

¡Buena suerte y a seguir practicando! 🚀
