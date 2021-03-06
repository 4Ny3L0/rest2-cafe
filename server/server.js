require('./config/config.js')
const express = require('express');
const body_p = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// parse application/x-www-form-urlencoded
app.use(body_p.urlencoded({ extended: false }))

// parse application/json
app.use(body_p.json())


app.use(require('./rutas/index'));

//Conexion a la base de datos con mongoose
//========================================
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err, resp) => {
    if (err) {
        throw err;
    }

    console.log('Conexion Satisfactoria a DB')
})

//=============================================

app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
})