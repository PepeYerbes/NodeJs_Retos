import mongoose from 'mongoose';

const autorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  nacionalidad: {
    type: String,
    required: [true, 'La nacionalidad es obligatoria'],
  },
  fechaNacimiento: {
    type: Date,
    required: false,
  },
});

export default mongoose.model('Autor', autorSchema);