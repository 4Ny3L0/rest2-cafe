
const express = require('express');
const app = express();

const UsuarioM = require('../models/usuarioM');

// ======RUTAS==========

//GET Usado para obtener usuarios de una base de datos
app.get('/usuarios', (req, resp) => {
    resp.json({
        ok: true,
        message: 'Todo bien con el GET'
    })
})

//POST Usado para crear usuarios
app.post('/usuario', (req, resp) => {

    let body = req.body;
    let usuario = new UsuarioM({
        nombre:body.nombre,
        email:body.email,
        password:body.password,
        estado:body.estado,
        google:body.google,
        role:body.role
    })

    usuario.save((err,usuarioCreado) =>{
        if(err){
            return resp.status(400).json({
                ok:false,
                error:err
            })
        }
        resp.json({
            ok: true,
            usuario: usuarioCreado,
            message: 'Usuario creado correctamente'
        })
    })
   
});


//PUT Modificar usuarios
app.put('/usuario/:id', (req, resp) => {
    let id = req.params.id;
    console.log(id)
    resp.json({
        ok: true,
        message: 'El put funciona bien'
    })

})

//DELETE usado para borrar registros
app.delete('/usuario/:id', (req, resp) => {
    resp.json({
        ok: true,
        message: 'El delete funciona bien'
    })
})

module.exports = app;