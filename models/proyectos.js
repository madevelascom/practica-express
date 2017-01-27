var mongoose     = require('mongoose');



//--------------------realiza la conexion---------------------------
/*
var mongoDB = 'mongodb://javiteri:1234@ds059908.mlab.com:59908/dashboard2';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/

//-------------------------------------------------------------------------
var Schema       = mongoose.Schema;

var proyectos   = new Schema({
    nombre: String
});

var Proyecto = mongoose.model('Proyecto', proyectos);


module.exports = Proyecto;
