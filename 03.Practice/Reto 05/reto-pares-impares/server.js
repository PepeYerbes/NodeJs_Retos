<<<<<<< HEAD
import express from "express";
import { separarParesImpares, parsearNumeros } from "./utils/separarParesImpares.js";
=======
const express = require('express');
const { separarParesImpares, validarNumeros } = require('./utils/separarParesImpares');
>>>>>>> upstream/main

const app = express();
const PORT = 3000;

<<<<<<< HEAD
app.get("/filtrar", (req, res) => {
  const { numeros, only, unique } = req.query;

  if (!numeros) {
    return res.status(400).json({
      error: "El parámetro 'numeros' es requerido",
      ejemplo: "?numeros=1,2,3,4,5"
    });
  }

  const listaNumeros = parsearNumeros(numeros, unique === "true");
  if (!listaNumeros) {
    return res.status(400).json({
      error: "El parámetro 'numeros' debe contener solo números separados por comas"
    });
  }

  const { pares, impares } = separarParesImpares(listaNumeros);

  const respuesta = { original: listaNumeros };
  if (only === "pares") respuesta.pares = pares;
  else if (only === "impares") respuesta.impares = impares;
  else {
    respuesta.pares = pares;
    respuesta.impares = impares;
  }

  res.json(respuesta);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
=======
// Middleware para parsear JSON
app.use(express.json());

// Ruta principal para filtrar números
app.get('/filtrar', (req, res) => {
    try {
        // Validar que el parámetro 'numeros' existe
        const { numeros, only, unique } = req.query;
        
        if (!numeros) {
            return res.status(400).json({
                error: "El parámetro 'numeros' es requerido",
                ejemplo: "?numeros=1,2,3,4,5"
            });
        }

        // Convertir string a array
        const numerosString = numeros.split(',');
        
        // Validar que todos sean números y convertir
        const numerosValidos = validarNumeros(numerosString);
        
        // Eliminar duplicados si se solicita
        const numerosFinales = unique === 'true' 
            ? [...new Set(numerosValidos)] 
            : numerosValidos;

        // Separar pares e impares
        const { pares, impares } = separarParesImpares(numerosFinales);

        // Construir respuesta base
        let respuesta = {
            original: numerosFinales,
            pares,
            impares
        };

        // Filtro específico si se solicita
        if (only === 'pares') {
            respuesta = {
                original: numerosFinales,
                pares
            };
        } else if (only === 'impares') {
            respuesta = {
                original: numerosFinales,
                impares
            };
        }

        res.json(respuesta);

    } catch (error) {
        res.status(400).json({
            error: error.message,
            ejemplo: "?numeros=1,2,3,4,5"
        });
    }
});

// Ruta de información
app.get('/', (req, res) => {
    res.json({
        mensaje: "Servidor de filtrado de números pares e impares",
        rutas: {
            filtrar: "GET /filtrar?numeros=1,2,3,4,5,6",
            ejemplos: [
                "/filtrar?numeros=1,2,3,4,5,6",
                "/filtrar?numeros=-3,-2,-1,0,1,2,3",
                "/filtrar?numeros=1,2,3,4&only=pares",
                "/filtrar?numeros=1,2,2,3,3,4&unique=true"
            ]
        }
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        rutas_disponibles: [
            "GET /",
            "GET /filtrar?numeros=1,2,3,4,5,6"
        ]
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📋 Prueba con: http://localhost:${PORT}/filtrar?numeros=1,2,3,4,5,6`);
    console.log(`📋 Ver ejemplos en: http://localhost:${PORT}`);
});
>>>>>>> upstream/main
