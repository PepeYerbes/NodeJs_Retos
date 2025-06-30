# Ejercicios Semana 2 - NodeJS

En esta carpeta encontrarás los ejercicios prácticos correspondientes a la **Semana 2** del curso de NodeJS. Aquí trabajarás con interacción en consola, módulos externos y lógica de conversión.

## Funcionalidades implementadas

1. **Aplicación interactiva de saludo**

   - Solicita nombre, edad y color favorito usando `inquirer`.
   - Muestra el nombre en arte ASCII con `figlet` y el color elegido con `chalk`.
   - Genera un mensaje personalizado según la edad usando la función `saludar`.

2. **Conversor interactivo de temperaturas**
   - Permite convertir entre Celsius y Fahrenheit.
   - Valida que no se ingresen temperaturas menores al cero absoluto.
   - Utiliza `inquirer` para la interacción, `chalk` y `boxen` para la presentación.

## ¿Cómo ejecutar los ejercicios?

1. Instala las dependencias necesarias:

   ```sh
   npm install
   ```

2. Ejecuta la aplicación de saludo:

   ```sh
   node app.mjs
   ```

3. Ejecuta el conversor de temperaturas:
   ```sh
   node convert.mjs
   ```

## Archivos principales

- `app.mjs`: Aplicación interactiva de saludo.
- `convert.mjs`: Conversor de temperaturas.
- `saludo.js`: Función para generar mensajes personalizados según la edad.
- `temperatura.js`: Funciones para conversión de temperaturas.

## Recomendaciones

- Explora y modifica el código para entender cómo funcionan las interacciones y conversiones.
- Consulta la documentación oficial de Node.js y los módulos externos si tienes dudas.
- Si necesitas ayuda, utiliza los canales de comunicación del curso.

# ¡Mucho éxito con los ejercicios de la semana 2!
