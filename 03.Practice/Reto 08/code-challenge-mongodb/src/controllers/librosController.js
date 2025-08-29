import mongoose from 'mongoose';
import Libro from '../models/Libro.js';
import Reseña from '../models/Reseña.js';

export const obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find().populate('autorId');
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros', mensaje: error.message });
  }
};

export const obtenerLibroPorId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  try {
    const libro = await Libro.findById(id).populate('autorId').populate('reseñas');
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro', mensaje: error.message });
  }
};

export const crearLibro = async (req, res) => {
  const { titulo, año, genero, autorId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(autorId)) {
    return res.status(400).json({ error: 'ID de autor inválido' });
  }
  try {
    const libro = new Libro({ titulo, año, genero, autorId });
    await libro.save();
    const libroPopulated = await Libro.findById(libro._id).populate('autorId');
    res.status(201).json(libroPopulated);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el libro', mensaje: error.message });
  }
};

export const actualizarLibro = async (req, res) => {
  const { id } = req.params;
  const { titulo, año, genero, autorId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id) || (autorId && !mongoose.Types.ObjectId.isValid(autorId))) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  try {
    const libro = await Libro.findByIdAndUpdate(
      id,
      { titulo, año, genero, autorId },
      { new: true, runValidators: true }
    ).populate('autorId');
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(200).json(libro);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el libro', mensaje: error.message });
  }
};

export const eliminarLibro = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  try {
    const libro = await Libro.findByIdAndDelete(id);
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    await Reseña.deleteMany({ libroId: id }); // Eliminar reseñas asociadas
    res.status(200).json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro', mensaje: error.message });
  }
};