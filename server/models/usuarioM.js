const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El Correo es requerido']
    }
});