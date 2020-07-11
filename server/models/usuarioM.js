const mongoose = require('mongoose');
const mongooseV= require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let roles={values:['ADMIN_ROLE','USER_ROLE'],message:'{VALUE} no es un rol valido'}

let UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El Correo es requerido'],
        
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        required: true,
        enum:roles
    },
    img:{
        type: String
    }
});


UsuarioSchema.plugin(mongooseV,{message:'el {PATH} ya existe, debe ser unico'})
module.exports= mongoose.model('Usuarios',UsuarioSchema)