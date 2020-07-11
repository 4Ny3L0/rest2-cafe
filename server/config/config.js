process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
let URLDB;
if (process.env.NODE_ENV == 'dev') {
    URLDB='mongodb+srv://4Ny3L0:AgM0nG0.06.M@cluster0.aaqdn.mongodb.net/cafe';
}else{
    URLDB='mongodb+srv://4Ny3L0:AgM0nG0.06.M@cluster0.aaqdn.mongodb.net/cafe'
}
DB=URLDB;
module.exports = process.env.PORT;