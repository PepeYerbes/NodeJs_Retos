const mongoose = require('mongoose');

const EstadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 250
    },
});

const Estado = mongoose.model('Estado', EstadoSchema);
module.exports = Estado;