const express = require('express');

const bcrypt = require('bcrypt');

const UsuarioM = require('../models/usuarioM');

const app = express();
app.post('/login', (req, res) => {
    res.json({
        ok: true
    })
})


module.exports = app;