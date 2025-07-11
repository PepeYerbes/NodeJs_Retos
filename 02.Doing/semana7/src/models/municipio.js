const mongoose = require('mongoose');

const MunicipioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 250
    },
    estadoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estado',
        required: true
    }       
});

const Municipio = mongoose.model('Municipio', MunicipioSchema);
module.exports = Municipio;