# Ejercicios Semana 3 - NodeJS

En esta carpeta encontrarás los ejercicios prácticos correspondientes a la **Semana 3** del curso de NodeJS. El enfoque está en la creación de un servidor HTTP básico, manejo de rutas y manipulación de archivos JSON.

## Funcionalidades implementadas

1. **Servidor HTTP básico**

   - Responde en `/`, `/contacto`, `/conocenos` y `/api` con diferentes formatos (HTML, JSON, texto).

2. **Gestión de equipo**

   - Endpoint `/equipo`: Devuelve el equipo completo en formato JSON.
   - Endpoint `/equipo/:nombre`: Busca y devuelve un miembro del equipo por nombre.
   - Endpoint `/equipo` (POST): Permite agregar un nuevo miembro al equipo (enviando JSON en el body).

3. **Utilidades**
   - Lectura y escritura de archivos JSON con utilidades propias.
   - Respuestas en diferentes formatos (HTML, JSON, texto plano).

## ¿Cómo ejecutar el ejercicio?

1. Instala las dependencias necesarias:

   ```sh
   npm install
   ```

2. Ejecuta el servidor:

   ```sh
   node server.js
   ```

3. Accede a los endpoints desde tu navegador o usando herramientas como Postman o curl:
   - `GET /`
   - `GET /contacto`
   - `GET /conocenos`
   - `GET /api`
   - `GET /equipo`
   - `GET /equipo/:nombre`
   - `POST /equipo` (con body JSON)

## Archivos principales

- `server.js`: Servidor HTTP principal.
- `routes.js`: Manejo de rutas y lógica de endpoints.
- `utils/`: Funciones auxiliares para respuestas y manejo de archivos.
- `data/equipo.json`: Archivo con los datos del equipo.

## Recomendaciones

- Explora y modifica el código para entender cómo funcionan las rutas y la manipulación de archivos.
- Consulta la documentación oficial de Node.js si tienes dudas.
- Si necesitas ayuda, utiliza los canales de comunicación del curso.

---

# ¡Mucho éxito con los ejercicios de la semana 3!

# ¡Sigue practicando y aprendiendo NodeJS!
