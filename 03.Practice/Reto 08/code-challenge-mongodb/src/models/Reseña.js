import mongoose from 'mongoose';

const reseñaSchema = new mongoose.Schema({
  comentario: {
    type: String,
    required: [true, 'El comentario es obligatorio'],
  },
  puntuacion: {
    type: Number,
    required: [true, 'La puntuación es obligatoria'],
    min: [1, 'La puntuación debe ser al menos 1'],
    max: [5, 'La puntuación no puede ser mayor a 5'],
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  libroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Libro',
    required: [true, 'El libro es obligatorio'],
  },
});

export default mongoose.model('Reseña', reseñaSchema);