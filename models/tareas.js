var mongoose     = require('mongoose');



//-------------------------------------------------------------------------
var Schema       = mongoose.Schema;

var tareas = new Schema({
	titulo : String,
	descripcion : String, 
	responsable : String,
	estado : {type : Number , enum : [1,2,3]},
	proyecto : { type: Schema.Types.ObjectId, ref: 'Proyecto' }
});

var Tarea = mongoose.model('Tarea', tareas);

module.exports = Tarea;