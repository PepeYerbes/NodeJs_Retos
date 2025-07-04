let usuarios = [];
let contadorUsuarioId = 1;

export function obtenerUsuarios(req, res) {
  res.json(usuarios);
}

export function obtenerUsuarioPorId(req, res) {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json(usuario);
}

export function crearUsuario(req, res) {
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  const nuevoUsuario = {
    id: contadorUsuarioId++,
    nombre: nombre.trim(),
    correo: correo.trim()
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
}

export function actualizarUsuario(req, res) {
  const id = parseInt(req.params.id);
  const { nombre, correo } = req.body;
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  usuario.nombre = nombre.trim();
  usuario.correo = correo.trim();
  res.json(usuario);
}

export function eliminarUsuario(req, res) {
  const id = parseInt(req.params.id);
  const existe = usuarios.find(u => u.id === id);

  if (!existe) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  usuarios = usuarios.filter(u => u.id !== id);
  res.status(204).json({ mensaje: 'Usuario eliminado', id });
}