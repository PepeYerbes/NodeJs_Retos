const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true, 
        trim: true,
        minlength: 2,
        maxlength: 140
    },
    email: {
        type: String,
        maxlength: 100,
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        match: [ /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/, 'Por favor ingresa un email válido' 

        ]
    },
    
    municipioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipio',
        required: true
        }       
});

    const Usuario = mongoose.model('Usuario', UsuariosSchema);
    module.exports = Usuario;