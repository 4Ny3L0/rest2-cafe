const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const UsuarioM = require('../models/usuarioM');

const { verificarToken } = require('../middlewares/autenticacion')

// ======RUTAS==========

//GET Usado para obtener usuarios de una base de datos
app.get('/usuarios', verificarToken, (req, res) => {


    let desde = req.query.desde || 0;
    let limite = req.query.limite || 0;
    let opciones = { desde: Number(desde), limite: Number(limite) }
    UsuarioM.find({ estado: true }, 'nombre email estado role google img')
        .skip(opciones.desde)
        .limit(opciones.limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err
                });
            }
            UsuarioM.countDocuments({ estado: true }, (err, total) => {
                res.json({
                    ok: true,
                    total,
                    usuarios

                });
            })

        });
})

//POST Usado para crear usuarios
app.post('/usuario', verificarToken, (req, res) => {

    let body = req.body;
    let usuario = new UsuarioM({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        estado: body.estado,
        google: body.google,
        role: body.role
    })

    usuario.save((err, usuarioCreado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioCreado,
            message: 'Usuario creado correctamente'
        })
    })

});


//PUT Modificar usuarios
app.put('/usuario/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])
    UsuarioM.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioActualizado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }
        res.json({
            ok: true,
            Usuario_actualizado: usuarioActualizado
        })
    })
})

//DELETE usado para borrar registros
app.delete('/usuario/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    UsuarioM.findByIdAndUpdate(id, { estado: false }, (err, usuario_borrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }
        if (usuario_borrado.estado === false) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no existe'
                }
            })
        }
        // console.log(usuario_borrado.estado)
        res.json({
            message: 'Usuario Borrado Satisfactoriamente',
            ok: true,
            Usuario: usuario_borrado
        })

    })
})

module.exports = app;