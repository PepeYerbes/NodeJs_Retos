const express = require('express');
const { contar } = require('./controllers/contarController');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para logging (opcional)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Ruta principal POST /contar
app.post('/contar', contar);

// Ruta GET para verificar el servidor
app.get('/', (req, res) => {
    res.json({
        mensaje: "🧠 Servidor de conteo de propiedades de objetos",
        rutas: {
            contar: "POST /contar",
            descripcion: "Envía un objeto JSON para contar sus propiedades"
        },
        ejemplos: {
            basico: {
                metodo: "POST",
                url: "/contar",
                body: {
                    "nombre": "Ana",
                    "edad": 25,
                    "correo": "ana@example.com"
                },
                respuesta: {
                    "propiedades": 3
                }
            },
            detallado: {
                metodo: "POST",
                url: "/contar?detallado=true",
                body: {
                    "nombre": "Ana",
                    "edad": 25
                },
                respuesta: {
                    "propiedades": 2,
                    "detalles": ["nombre", "edad"]
                }
            }
        }
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        rutas_disponibles: [
            "GET /",
            "POST /contar"
        ]
    });
});

// Manejo de errores de JSON malformado
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({
            error: "JSON malformado en el body de la petición",
            mensaje: "Verifica que el JSON esté bien estructurado"
        });
    }
    next();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📋 Información del servidor: http://localhost:${PORT}`);
    console.log(`📋 Ruta principal: POST http://localhost:${PORT}/contar`);
    console.log('\n📚 Ejemplos de uso:');
    console.log('curl -X POST http://localhost:3000/contar \\');
    console.log('  -H "Content-Type: application/json" \\');
    console.log('  -d \'{"nombre":"Ana","edad":25,"correo":"ana@example.com"}\'');
});