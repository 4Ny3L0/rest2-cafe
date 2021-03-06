process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
let URLDB;
if (process.env.NODE_ENV == 'dev') {
    URLDB = 'mongodb://localhost:27017/cafe';
} else {
    URLDB = process.env.db;
}
DB = URLDB;


/* VENCIMIENTO*/
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

/* SEED*/
process.env.SEED = process.env.SEED || 'palabra-clave';
module.exports = process.env.PORT;