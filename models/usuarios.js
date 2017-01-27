//Import the mongoose module
var mongoose = require('mongoose');



//--------------------realiza la conexion---------------------------
//Set up default mongoose connection
var mongoDB = 'mongodb://javiteri:1234@ds059908.mlab.com:59908/dashboard2';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//----------------------------------------------------------------------------------------------
//instancia el esquema
var Schema = mongoose.Schema;

//crea el esquema usarios
var usuarioS = new Schema({
    nombre         : String,
});

//lo setea en la base de datos

var Usuario = mongoose.model("usuario", usuarioS);

//lo envia para exportar
module.exports = Usuario;

