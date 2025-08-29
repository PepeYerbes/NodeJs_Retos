import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    unique: true,
  },
  año: {
    type: Number,
    required: [true, 'El año es obligatorio'],
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio'],
  },
  autorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Autor',
    required: [true, 'El autor es obligatorio'],
  },
});

export default mongoose.model('Libro', libroSchema);