# 🔢 Códigos de Estado HTTP - Curso NodeJS

## 1xx - Respuestas Informativas

| Código | Nombre | Descripción |
|--------|---------|-------------|
| 100 | Continue | El servidor ha recibido los headers y el cliente puede continuar |
| 101 | Switching Protocols | El servidor acepta cambiar el protocolo |

## 2xx - Respuestas Exitosas ✅

| Código | Nombre | Descripción | Uso Común en APIs |
|--------|---------|-------------|-------------------|
| **200** | **OK** | Petición exitosa | GET exitoso, respuesta general |
| **201** | **Created** | Recurso creado exitosamente | POST exitoso (crear usuario, producto) |
| **202** | **Accepted** | Petición aceptada para procesamiento | Operaciones asíncronas |
| **204** | **No Content** | Exitoso pero sin contenido | DELETE exitoso, PUT sin respuesta |

```javascript
// Ejemplos de uso en Express
res.status(200).json({ usuarios }); // GET /usuarios
res.status(201).json({ usuario }); // POST /usuarios
res.status(204).send(); // DELETE /usuarios/:id
```

## 3xx - Redirecciones 🔄

| Código | Nombre | Descripción | Uso Común |
|--------|---------|-------------|-----------|
| **301** | **Moved Permanently** | Recurso movido permanentemente | Cambio de URL definitivo |
| **302** | **Found** | Recurso movido temporalmente | Redirección temporal |
| **304** | **Not Modified** | Recurso no modificado | Cache del navegador |

## 4xx - Errores del Cliente ❌

| Código | Nombre | Descripción | Uso Común en APIs |
|--------|---------|-------------|-------------------|
| **400** | **Bad Request** | Petición malformada | Validación fallida, JSON inválido |
| **401** | **Unauthorized** | Autenticación requerida | Token faltante o inválido |
| **403** | **Forbidden** | Sin permisos para el recurso | Usuario sin privilegios |
| **404** | **Not Found** | Recurso no encontrado | ID inexistente, ruta no existe |
| **405** | **Method Not Allowed** | Método HTTP no permitido | POST en ruta que solo acepta GET |
| **409** | **Conflict** | Conflicto con estado actual | Email ya registrado, username duplicado |
| **422** | **Unprocessable Entity** | Entidad no procesable | Validación de negocio fallida |
| **429** | **Too Many Requests** | Demasiadas peticiones | Rate limiting |

```javascript
// Ejemplos de manejo de errores
app.post('/usuarios', (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ error: 'Email requerido' });
  }
  
  if (emailYaExiste) {
    return res.status(409).json({ error: 'Email ya registrado' });
  }
  
  // Usuario creado exitosamente
  res.status(201).json({ usuario });
});

app.get('/usuarios/:id', (req, res) => {
  const usuario = encontrarUsuario(req.params.id);
  
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  res.status(200).json({ usuario });
});
```

## 5xx - Errores del Servidor 🔥

| Código | Nombre | Descripción | Uso Común |
|--------|---------|-------------|-----------|
| **500** | **Internal Server Error** | Error interno del servidor | Bug en el código, excepción no manejada |
| **501** | **Not Implemented** | Funcionalidad no implementada | Endpoint en desarrollo |
| **502** | **Bad Gateway** | Gateway inválido | Proxy/Load balancer con problemas |
| **503** | **Service Unavailable** | Servicio no disponible | Mantenimiento, sobrecarga |

```javascript
// Manejo de errores del servidor
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json({ usuarios });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
```

## 📋 Códigos Más Usados en APIs REST

### Para Operaciones CRUD

```javascript
// CREATE - POST /usuarios
res.status(201).json({ usuario }); // Éxito
res.status(400).json({ error }); // Datos inválidos
res.status(409).json({ error }); // Conflicto (duplicado)

// READ - GET /usuarios/:id
res.status(200).json({ usuario }); // Encontrado
res.status(404).json({ error }); // No encontrado

// UPDATE - PUT /usuarios/:id
res.status(200).json({ usuario }); // Actualizado con respuesta
res.status(204).send(); // Actualizado sin respuesta
res.status(404).json({ error }); // No encontrado

// DELETE - DELETE /usuarios/:id
res.status(204).send(); // Eliminado exitosamente
res.status(404).json({ error }); // No encontrado
```

### Para Autenticación

```javascript
// Login exitoso
res.status(200).json({ token, usuario });

// Credenciales inválidas
res.status(401).json({ error: 'Credenciales inválidas' });

// Token requerido
res.status(401).json({ error: 'Token requerido' });

// Token expirado
res.status(401).json({ error: 'Token expirado' });

// Sin permisos
res.status(403).json({ error: 'Sin permisos para esta acción' });
```

## 🎯 Buenas Prácticas

1. **Consistencia**: Usa siempre los mismos códigos para situaciones similares
2. **Mensajes claros**: Incluye mensajes de error descriptivos
3. **Documentación**: Documenta qué códigos puede devolver cada endpoint
4. **Logging**: Registra errores 5xx para debugging
5. **Graceful handling**: Maneja todos los casos posibles

```javascript
// Middleware global para manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'ID inválido' });
  }
  
  res.status(500).json({ error: 'Error interno del servidor' });
});
```