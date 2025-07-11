const Usuario = require('../models/usuario');
async function obternerUsuario(req, res){
try {
const user = await Usuario.findbyId(req.params.id);
if (!user) {    
    res.status(400).json({error:'Usuario no encontrado'});
    res.json(user);
    } catch (error) {
    res.status(500).json({error: 'Internal Server Error'
        });
    }
}
    
async function obternerUsuarios(req, res){
    const users = await Usuario.find().sort({nombreCompleto});
    res.json(users);
}
async function crearUsuario(req, res){
    try {
    const { nombreCompleto , email, municipioId } = req.body;

    // Validación de campos requeridos
    if (!nombre || !email || !municipioId) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Creación del nuevo usuario
    const newUser = await Usuario.create({
        nombreCompleto,
        email,
        municipioId
    });
    res.json(newUser);
}catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
        }   
    }

    // Guardar el usuario en la base de datos
    nuevoUsuario.save()
        .then(usuario => res.status(201).json(usuario))
        .catch(error => res.status(500).json({ error: 'Error al crear el usuario', details: error.message }));
}

function actualizarUsuario(req, res){
    try {
    const { nombreCompleto , email, municipioId } = req.body;

    // Validación de campos requeridos
    if (!nombre || !email || !municipioId) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    const updatedUser = await Usuario.findByIdAndUpdate(
        req.params.id,
        { nombreCompleto, email, municipioId },
        { new: true }
    );
    if (!updatedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(updatedUser);
}}

async function eliminarUsuario(req, res){
    try {
        const deletedUser = await Usuario.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}

module.exports = {
    obternerUsuario,
    obternerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};