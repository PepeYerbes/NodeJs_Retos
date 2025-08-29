import Autor from '../models/Autor.js';
import mongoose from 'mongoose';

export const crearAutor = async (req, res) => {
  const { nombre, nacionalidad, fechaNacimiento } = req.body;
  try {
    const autor = new Autor({ nombre, nacionalidad, fechaNacimiento });
    await autor.save();
    res.status(201).json(autor);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el autor', mensaje: error.message });
  }
};

export const obtenerAutores = async (req, res) => {
  try {
    const autores = await Autor.find();
    res.status(200).json(autores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los autores', mensaje: error.message });
  }
};