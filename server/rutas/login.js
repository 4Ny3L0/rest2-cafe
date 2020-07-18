require('../config/config.js')
const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioM = require('../models/usuarioM');

const app = express();
app.post('/login', (req, res) => {

    let body = req.body;

    UsuarioM.findOne({ email: body.email, estado: true }, (err, usuariodb) => {
        // console.log(process.env.CADUCIDAD_TOKEN)
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            })

        }
        if (!usuariodb) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: '(usuario) o contraseña incorrecta'
                }
            })

        }
        if (!bcrypt.compareSync(body.password, usuariodb.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'usuario o (contraseña) incorrecta'
                }
            })
        }
        let token = jwt.sign({
            usuario: usuariodb
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        res.json({
            ok: true,
            usuario: usuariodb,
            token
        });
    })

})


module.exports = app;